import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  path: String,
  ip: String,
  method: String,
  params: Map,
  request: Map,
  response: Map,
  at: String,
});

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
