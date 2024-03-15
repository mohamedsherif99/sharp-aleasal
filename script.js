document.addEventListener('DOMContentLoaded', function() {
  var texts = [




    " ١ - ١ أَنَا فِي أَنَا إِنِّي وَإِنِّيَ فِي أَنَا * رَحِيقِيَ مَخْتُومٌ بِمِسْكِ الْحَقِيقَةِ ",
  

];


 

  document.getElementById('searchInput').addEventListener('keyup', function() {
      var searchQuery = this.value.trim();
      var normalizedQuery = normalizeArabic(searchQuery);
      var resultsContainer = document.getElementById('searchResults');
      resultsContainer.innerHTML = ''; // Clear previous results
      var matchesCount = 0;

      texts.forEach(function(text) {
          var normalizedText = normalizeArabic(text);
          if (normalizedText.includes(normalizedQuery) && normalizedQuery !== "") {
              matchesCount++;
              var resultDiv = document.createElement('div');
              resultDiv.className = 'result'; // تطبيق فئة الأنماط
              var highlightedText = text.replace(new RegExp(`(${searchQuery})`, 'gi'), "<mark>$1</mark>");
              resultDiv.innerHTML = highlightedText;
              resultsContainer.appendChild(resultDiv);
              // إنشاء زر نسخ
              var copyBtn = document.createElement('button');
              copyBtn.textContent = 'نسخ';
              copyBtn.className = 'copyButton'; // تأكد من تعريف هذه الفئة في CSS الخاص بك
              copyBtn.onclick = function() {
                navigator.clipboard.writeText(text).then(() => {
                  copyBtn.textContent = 'تم النسخ!';
                  copyBtn.style.color = '#FFFFFF'; // تغيير لون النص
                  copyBtn.style.backgroundColor = '#1335c4'; // تغيير لون الخلفية
                  setTimeout(() => {
                    copyBtn.textContent = 'نسخ';
                    copyBtn.style.color = ''; // إعادة لون النص للوضع الافتراضي
                    copyBtn.style.backgroundColor = ''; // إعادة لون الخلفية للوضع الافتراضي
                  }, 800);
                }).catch(err => {
                  console.error('حدث خطأ أثناء النسخ:', err);
                });
              };
              resultDiv.appendChild(copyBtn);
              resultsContainer.appendChild(resultDiv);
          }
          
      });

      var resultsCountDiv = document.getElementById('resultsCount');
      resultsCountDiv.textContent = `عدد النتائج: ${matchesCount}`; // تحديث عدد النتائج
      resultsCountDiv.style.color = '#8d2828'; // تعديل لون النص
      resultsCountDiv.className = 're'; // تطبيق الفئة لتعديل اللون والحجم


      if (matchesCount === 0) {
          resultsContainer.innerHTML = '<div>لم يتم العثور على نتائج</div>';
      }
  });

  function normalizeArabic(text) {
      return text.normalize('NFD')
                 .replace(/[\u064B-\u0652]/g, '') // إزالة التشكيل
                 .toLowerCase(); // توحيد حالة الحروف
  }
});


// عند التمرير، إظهار أو إخفاء الزر
window.onscroll = function() {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("backToTopButton").style.display = "block";
    } else {
      document.getElementById("backToTopButton").style.display = "none";
    }
  }
  
  // عند النقر، العودة إلى الأعلى
  document.getElementById("backToTopButton").addEventListener("click", function(){
    document.body.scrollTop = 0; // لـ Safari
    document.documentElement.scrollTop = 0; // لـ Chrome, Firefox, IE و Opera
  });
  


