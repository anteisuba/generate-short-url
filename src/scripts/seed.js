import URLRecord from "../models/urlRecordModel.js";
import sequelize from "../utils/dbHelper.js";

(async () => {
  try {
    console.log("[seed] syncing...");
    await URLRecord.sync({ force: true });
    console.log("[seed] synced");
  } catch (err) {
    console.error("[seed] error:", err);
  } finally {
    console.log("[seed] closing db...");
    await sequelize.close();
    console.log("[seed] closed");

    process.exit(0); // ← 必须加
  }
})();
