const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin:"*"
}))
app.use('/api/chat', chatRoutes);

app.use("/api" , (req,res)=>{
  res.send("api is running")
})
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
