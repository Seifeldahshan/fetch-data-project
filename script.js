let data;

async function getText() {
  try {
    let x = await fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=21&context=embed");
    if (!x.ok) {
      throw new Error("No response");
    }
    data = await x.json();
    generateCards();
  } catch (error) {
    console.error(" error :", error);
  }
}

function generateCards() {
  const cardContainer = document.getElementById('cardContainer');

  try {
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('col-3');
      card.style.backgroundColor = 'rgb(172, 172, 172)';

      card.innerHTML = `
        <a href="${item.link}" target="_blank">
          <img src="${item.jetpack_featured_media_url}" alt="${item.title.rendered}">
          <h2>${item.title.rendered}</h2>
        </a>
        <p>${item.excerpt.rendered}</p>
      `;

      cardContainer.appendChild(card);
    });

    showScrollButton();
  } catch (error) {
    console.error("error:", error);
   
  }

      showScrollButton();
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showScrollButton() {
      const scrollButton = document.getElementById('scrollButton');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          scrollButton.style.display = 'block';
        } else {
          scrollButton.style.display = 'none';
        }
      });
    }

    getText();