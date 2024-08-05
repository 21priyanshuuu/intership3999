import dbConnectPrimary from "./dbConnectPrimary";
import dbConnectSecondary from "./dbConnectSecondary";
export default async function db() {
  await dbConnectPrimary();
  await dbConnectSecondary();
}
