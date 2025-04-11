// تشغيل الكود الأول عند الضغط على الزر الأول
document.getElementById('runCode1').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

      let btns = document.querySelectorAll("button[data-testid='reply']");

      btns.forEach((btn) => {
        let text = btn.textContent || btn.innerText;
        let number = parseInt(text.match(/\d+/)); // استخراج الرقم من النص

        if (number >= 100 && number <= 300) {
          btn.scrollIntoView({ behavior: "smooth", block: "center" }); // تمركز الصفحة على الزر
        }
      });


    }
  });
});

// تشغيل الكود الثاني عند الضغط على الزر الثاني
document.getElementById('runCode2').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {


      (() => {
        const $followButtons = '[data-testid$="-unfollow"]';
        const $confirmButton = '[data-testid="confirmationSheetConfirm"]';

        const retry = {
          count: 0,
          limit: 3,
        };

        const scrollToTheBottom = () => window.scrollTo(0, document.body.scrollHeight);
        const retryLimitReached = () => retry.count === retry.limit;
        const addNewRetry = () => retry.count++;

        const sleep = ({ seconds }) =>
          new Promise((proceed) => {
            console.log(`WAITING FOR ${seconds} SECONDS...`);
            setTimeout(proceed, seconds * 5000);
          });

        const unfollowAll = async (followButtons) => {
          console.log(`UNFOLLOWING ${followButtons.length} USERS...`);
          await Promise.all(
            followButtons.map(async (followButton) => {
              followButton && followButton.click();
              await sleep({ seconds: 1 });
              const confirmButton = document.querySelector($confirmButton);
              confirmButton && confirmButton.click();
            })
          );
        };

        const nextBatch = async () => {
          scrollToTheBottom();
          await sleep({ seconds: 1 });

          let followButtons = Array.from(document.querySelectorAll($followButtons));
          followButtons = followButtons.filter(b => b.parentElement?.parentElement?.querySelector('[data-testid="userFollowIndicator"]') === null)
          const followButtonsWereFound = followButtons.length > 0;

          if (followButtonsWereFound) {
            await unfollowAll(followButtons);
            await sleep({ seconds: 2 });
            return nextBatch();
          } else {
            addNewRetry();
          }

          if (retryLimitReached()) {
            console.log(`NO ACCOUNTS FOUND, SO I THINK WE'RE DONE`);
            console.log(`RELOAD PAGE AND RE-RUN SCRIPT IF ANY WERE MISSED`);
          } else {
            await sleep({ seconds: 2 });
            return nextBatch();
          }
        };

        nextBatch();
      })();

    }
  });
});

// تشغيل الكود الثالث عند الضغط على الزر الثالث
document.getElementById('runCode3').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

// Select all "Follow @" buttons
const followButtons = document.querySelectorAll("button[aria-label*='Follow @']");

// Initialize a Set to track processed labels
const processedLabels = new Set();

// Filter the unique buttons
const btns = Array.from(followButtons).filter((button) => {
    const ariaLabel = button.getAttribute("aria-label");

    if (!processedLabels.has(ariaLabel)) {
        processedLabels.add(ariaLabel); // Mark as processed
        return true; // Keep this button in the filtered result
    }

    return false; // Exclude duplicates
});

// `btns` now contains only unique buttons
console.log("Unique buttons:", btns);

let i = 0;

// Set an interval to process buttons
const intervalId = setInterval(() => {
    // Check if there are still buttons left to process
    if (i >= btns.length) {
        clearInterval(intervalId); // Stop the interval
        console.log("All buttons have been processed.");
        return; // Exit the function
    }

    // Process the current button
    const btn = btns[i];
    btn.click(); // Perform the click

    // Move to the next button
    i++;
}, 3000);



    }
  });
});


// تشغيل الكود الثالث عند الضغط على الزر الرابع
document.getElementById('runCode4').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

      // هنا الفنكشن
      let scrollCount = 0;
      let maxScrolls = 3;
      let scrollDistance = 2000; // المسافة التي تريد التمرير بها في كل مرة (يمكنك تعديلها)

      function scrollDown() {
        if (scrollCount < maxScrolls) {
          window.scrollBy(0, scrollDistance);
          scrollCount++;
          setTimeout(scrollDown, 500); // الانتظار لمدة نصف ثانية بين كل تمرير
        }
      }

      scrollDown();




    }
  });
});

// تشغيل الكود الثالث عند الضغط على الزر 5
document.getElementById('runCode5').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

      //  START
      let profile_pics = document.querySelectorAll("[data-testid='primaryColumn'] > .css-175oi2r > .css-175oi2r:nth-child(3) > .css-175oi2r > div > div div.r-172uzmj");

      const hovering = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      for (let i = 0; i < 100; i++) {

        var profile_pic = profile_pics[i]
        profile_pic.dispatchEvent(hovering);

      }

    }
  });
});



// تشغيل الكود الثالث عند الضغط على الزر 6
document.getElementById('runCode6').addEventListener('click', async () => {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

      //  START
      let profile_pics = document.querySelectorAll(".r-1w6e6rj > .r-13awgt0 > div div.r-172uzmj");


      


      const hovering = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      for (let i = 0; i < 100; i++) {

        var profile_pic = profile_pics[i]
        profile_pic.dispatchEvent(hovering);

      }

    }
  });
});



// دالة للحصول على التبويب النشط الحالي
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
