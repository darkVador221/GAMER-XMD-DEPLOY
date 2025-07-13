document.getElementById("deployForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const botname = document.getElementById("botname").value.trim();
  const owner = document.getElementById("owner").value.trim();
  const session = document.getElementById("session").value.trim();

  const envContent = `SESSION_ID="${session}"
OWNER_NAME="${botname}"
OWNER_NUMBER="${owner}"
MODE="public"
WELCOME=false
AUTO_READ_STATUS=true
STATUS_READ_MSG="*Status Seen By ${botname} ⚡*"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=true
AUTO_REACT=false
PREFIX="."`;

  const blob = new Blob([envContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${botname.replace(/\s+/g, "_")}.env`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});