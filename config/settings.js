module.exports = {
  "app": {
    "port": process.env.HEALTH_APP_PORT || "4000"
  },
  "ri_health_check": {
    "url": process.env.HEALTH_APP_URL || "https://intelligence.rackspace.com/health",
    "username": process.env.HEALTH_APP_USER || "",
    "password": process.env.HEALTH_APP_PASS || ""
  },
  "timeout": 20000
};
