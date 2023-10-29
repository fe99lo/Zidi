var onlineUsers = 0;
    var maxCount = 20000;
    var countInterval;

    function updateOnlineUsers() {
      onlineUsers++;
      if (onlineUsers > maxCount) {
        onlineUsers = maxCount;
      }
      document.getElementById("online-users").textContent = onlineUsers;
    }

    countInterval = setInterval(updateOnlineUsers, 1000);