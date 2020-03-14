const hideAnnouncement = container => {
  if (container) {
    container.style.display = "none";
  }
}

(function () {
    const announcement = document.getElementById("announcement");
    const announcementCloseButton = document.getElementById("announcement-close");

    announcementCloseButton.addEventListener("click", () => hideAnnouncement(announcement))

    setTimeout(() => hideAnnouncement(announcement), 16000);
  }());