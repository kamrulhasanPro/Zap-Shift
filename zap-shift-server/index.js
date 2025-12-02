// defined
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import admin from "firebase-admin";
import { MongoClient, ObjectId } from "mongodb";
const port = process.env.PORT || 4000;
const app = express();

// middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  console.log(
    `⚡ ${req.method} - ${req.path} from ${
      req.host
    } at ⌛ ${new Date().toLocaleString()}`
  );
  next();
});

// firebase access token check
const decode = Buffer.from(process.env.FB_ADMIN_SDK, "base64").toString(
  "utf-8"
);
const serviceAccount = JSON.parse(decode);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFBToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized User." });
    }
    const token = authHeader.split(" ")[1];

    // verify
    const decodeUser = await admin.auth().verifyIdToken(token);

    req.user = decodeUser;
    next();
  } catch (error) {
    console.error("Firebase Token Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  const decoded_email = req.user.email;
  try {
    const user = await userCollection.findOne({ email: decoded_email });
    if (!user || user?.role !== "Admin") {
      return res.status(403).send({ message: "Forbidden User" });
    }
    next();
  } catch (error) {
    console.log("verify email problem.");
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// make tracking id
function generateTrackingId() {
  const prefix = "ZAP";

  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}

// mongodb
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db("zap-shipt");
const userCollection = database.collection("users");
const parcelsCollection = database.collection("parcels");
const paymentHistoriesCollection = database.collection("paymentHistories");
const riderCollection = database.collection("riders");

// listen and mongodb connect
client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log({ massage: "mongodb connection problem", error: err });
  });

// ----------user----------
app.post("/register-user", async (req, res) => {
  try {
    const user = req.body;
    user.role = "User";

    // isExit user?
    const { email } = req.body;
    const isExitUser = await userCollection.findOne({ email });
    if (isExitUser) {
      return res.send({ message: "User Already stored in mongoDB" });
    }

    const result = await userCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    console.log("Register error:", error);
  }
});

// get users
app.get("/users", async (req, res) => {
  try {
    const searchValue = req.query.search;
    const query = {};
    if (searchValue) {
      query.$or = [
        { email: { $regex: searchValue, $options: "i" } },
        { displayName: { $regex: searchValue, $options: "i" } },
      ];
    }
    const result = await userCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    console.log("Users get api problem");
    res.send({ message: "user get problem." });
  }
});

// get one user role
app.get("/user/:email/role", verifyFBToken, async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userCollection.findOne({ email });
    const role = user?.role || "User";
    res.send(role);
  } catch (error) {
    console.log("User one get api problem");
    res.send({ message: "user get one problem." });
  }
});

// patch user role
app.patch("/users/:id", verifyFBToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);
    const update = { $set: { role: status } };
    const query = { _id: new ObjectId(req.params.id) };
    const result = await userCollection.updateOne(query, update);
    res.send(result);
  } catch (error) {
    console.log("Users Patch api problem");
    res.send({ message: "user role patch problem." });
  }
});

// ----------rider----------
app.post("/riders", async (req, res) => {
  try {
    // check exit rider
    const isRider = await riderCollection.findOne({ email: req.body.email });
    if (isRider) {
      return res.send({ message: "Already You are a Rider." });
    }

    const newRider = req.body;
    newRider.status = "Pending";
    newRider.createdAt = new Date();

    const result = await riderCollection.insertOne(newRider);
    res.send(result);
  } catch (error) {
    console.log("Riders api problem");
    res.send({ message: "Maybe ride add problem." });
  }
});

// get rider pending data
app.get("/riders", async (req, res) => {
  try {
    const { status, workStatus, district } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    if (workStatus) {
      query.workStatus = workStatus;
    }

    if (district) {
      query.district = district;
    }
    const result = await riderCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    console.log("Riders get api problem");
    res.send({ message: "Maybe ride get problem." });
  }
});

// status update
app.patch("/rider-status/:id", verifyFBToken, async (req, res) => {
  const { workStatus, status, email, update: updateUserRole } = req.body;
  const query = { _id: new ObjectId(req.params.id) };
  try {
    const update = {
      $set: {
        status,
        workStatus,
      },
    };

    const result = await riderCollection.updateOne(query, update, {
      upsert: true,
    });

    // user role update and set raider
    if (status === "Approved") {
      await userCollection.updateOne({ email }, updateUserRole);
    } else {
      await userCollection.updateOne({ email }, updateUserRole);
    }

    res.send(result);
  } catch (error) {
    console.log("Riders status patch api problem");
    res.send({ message: "Maybe rider status problem." });
  }
});

// delete rider
app.delete("/riders/:id", verifyFBToken, async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await riderCollection.deleteOne(query);

    // user role update and set raider
    const update = {
      $set: {
        role: "User",
      },
    };
    await userCollection.updateOne({ email }, update);
    res.send(result);
  } catch (error) {
    console.log("Riders delete patch api problem");
    res.send({ message: "Maybe delete approve problem." });
  }
});

// ----------parcel---------
app.post("/parcels", async (req, res) => {
  const parcel = req.body;

  // date add
  parcel.postAt = new Date();

  try {
    const result = await parcelsCollection.insertOne(parcel);
    res.send(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// get parcels or my
app.get("/parcels", verifyFBToken, async (req, res) => {
  const { email } = req.query;
  if (req.user.email !== email) {
    return res
      .status(403)
      .send({ message: "Forbidden user not access for you" });
  }

  const query = {};
  if (email) {
    query.senderEmail = email;
  }

  const options = { sort: { postAt: -1 } };

  try {
    const cursor = parcelsCollection.find(query, options);
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// delete parcel
app.delete("/parcels/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    const result = await parcelsCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// get one data
app.get("/parcels/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    const result = await parcelsCollection.findOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// get all pending parcels
app.get("/pending-parcels", verifyFBToken, verifyAdmin, async (req, res) => {
  try {
    const query = { deliveryStatus: "pending-pickup" };
    const parcels = await parcelsCollection.find(query).toArray();
    res.send(parcels);
  } catch (error) {
    console.log("pending parcels api problem");
    res.send({ message: "pending-parcels get problem." });
  }
});

// patch parcels
app.patch("/parcel/:id", async (req, res) => {
  try {
    const { riderId, riderEmail, riderName } = req.body;
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        deliveryStatus: "driver_assigned",
        riderId,
        riderEmail,
        riderName,
      },
    };

    const result = await parcelsCollection.updateOne(query, update, {upsert: true});

    // update river status
    const riderQuery = { _id: new ObjectId(riderId) };
    const workStatusUpdateDoc = {
      $set: {
        workStatus: "in_delivery",
      },
    };
    const riderResult = await riderCollection.updateOne(
      riderQuery,
      workStatusUpdateDoc
    );

    res.send(riderResult);
  } catch (error) {
    console.log('parcel patch problem');
    res.send({message: "parcel patch problem"})
  }
});

// payment history based on user email
app.get("/payment-history", verifyFBToken, async (req, res) => {
  const { email } = req.query;
  const query = {};
  if (email === req.user.email) {
    query.customerEmail = email;
  } else {
    console.error("Forbidden User:");
    return res.status(403).json({ message: "Forbidden: not allow for you." });
  }
  try {
    const paymentHistory = await paymentHistoriesCollection
      .find(query)
      .sort({ created: -1 })
      .toArray();
    res.send(paymentHistory);
  } catch (error) {
    console.error("Payment history error:", error);
    return res
      .status(500)
      .json({ message: "Data fetching payment history error." });
  }
});

// ---------stripe-----------
// new
app.post("/create-checkout-session", async (req, res) => {
  try {
    const paymentInfo = req.body;
    // const amount = paymentInfo.cost * 100;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: paymentInfo.cost,
            product_data: {
              name: `Pay to for: ${paymentInfo.parcelName}`,
              description: paymentInfo.description,
              images: [
                "https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png",
              ],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        parcel_id: paymentInfo._id,
        parcel_name: paymentInfo.parcelName,
      },
      customer_email: paymentInfo.senderEmail,
      mode: "payment",
      success_url: `${process.env.SITE_DOMAIN}/dashboard/payment_success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment_error`,
    });
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// retrieve session id
app.patch("/success_payment", async (req, res) => {
  const { session_id } = req.query;
  console.log(`again try`);
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // console.log(session);

    const checkPayment = await paymentHistoriesCollection.findOne({
      session_id: session.id,
    });
    if (checkPayment) {
      return res.send({
        message: "not valid payment, already this payment success",
        checkPayment,
      });
    }
    if (session.payment_status === "paid") {
      const query = { _id: new ObjectId(session.metadata.parcel_id) };
      const trackingId = generateTrackingId();
      const update = {
        $set: {
          paymentStatus: "paid",
          deliveryStatus: "pending-pickup",

          trackingId,
        },
      };
      const result = await parcelsCollection.updateOne(query, update, {
        upsert: true,
      });

      // history add
      const paymentInfo = {
        session_id: session.id,
        amount: session.amount_total,
        currency: session.currency,
        created: session.created,
        customerEmail: session.customer_email,
        parcelId: session.metadata.parcel_id,
        transaction: session.payment_intent,
        paymentStatus: session.payment_status,
        parcelName: session.metadata.parcel_name,
        trackingId,
      };
      const paymentHistory = await paymentHistoriesCollection.insertOne(
        paymentInfo,
        { upsert: true }
      );
      res.send({
        result,
        email: session.customer_email,
        paymentInfo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "server error",
    });
  }
});

// old
// app.post("/create-checkout-session", async (req, res) => {
//   const paymentInfo = req.body;
//   const amount = parseInt(paymentInfo.cost) * 100;
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "USD",
//           unit_amount: amount,
//           product_data: {
//             name: paymentInfo.name,
//           },
//         },
//         quantity: 1,
//       },
//     ],
//     currency: "usd",
//     metadata: {
//       paymentId: paymentInfo._id,
//     },
//     customer_email: paymentInfo.senderEmail,
//     mode: "payment",
//     success_url: `${process.env.SITE_DOMAIN}/dashboard/payment_success`,
//     cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment_error`,
//   });

//   res.send(session.url);
// });

// basic
app.get("/", (req, res) => {
  res.send({
    status: 200,
    massage: `server is running on this prot ${port}`,
  });
});

// not found page
app.get(/.*/, (req, res) => {
  res.json({
    status: 404,
    error: "not found page",
  });
});
