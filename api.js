
const dataLoad = async() => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json();

    // console.log(data.data);


    displayData(data)
}


const displayData = (categories) => {
     let info = categories.data.news_category;
    //  console.log(info)
     const subMenu = document.getElementById('menu-id-1');
     const menu = document.getElementById('menu-id-2');
     
    //  info = info.slice(0,6);
      
    
     info.forEach(element => {
        const subL1 = document.createElement('li');
        const li2 = document.createElement('li');
      
        subL1.innerHTML = `<li onclick="newsDisplay('${element.category_id}')" class="font-bold">${element.category_name}</li>`;
        li2.innerHTML = `<li onclick="newsDisplay('${element.category_id}')" class="font-bold">${element.category_name}</li>`;

        subMenu.appendChild(subL1);
        menu.appendChild(li2)
     });

     
}


const newsDisplay = async(id) =>{
    // console.log(id);

    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const data = await res.json();

    // console.log(data.data.length);
    
    const noData = document.getElementById('no-data');
     if (data.data.length === 0) {
         noData.classList.remove('hidden')
     }
     else {
        noData.classList.add("hidden");
     }


    const container = document.getElementById('container');
    container.textContent = ''

    data.data.forEach(element =>{

        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-xl')
        div.innerHTML = `
        <figure>
              <img
                src="${element.image_url}"
              />
            </figure>
            <div class="card-body">
            
              <p class="font-bold">${element.title}</p>
              <hr>
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img class="w-[50px] rounded-full" src="${
                          element.author.img
                        }" alt="">
                          <span class="font-bold ml-2">${
                            element?.author?.name || "No found"
                          }</span>
                    </div>
                     
                    <div>
                        <p class="font-bold">${
                          element.author.published_date
                        }</p>
                    </div>
                </div>
                 
                 <div class="flex justify-between">
                    <div>
                        <p class="font-bold">rating <span>${
                          element.rating.number
                        }</span></p>
                    </div>
                     <div>
                        <p class="font-bold">views: <span>${
                          element.total_view
                        }</span></p>
                     </div>
                 </div>
                 <div>

                 </div>
              <div class="card-actions justify-center">
                <button onclick="seeMoreDetails('${
                  element._id
                }')" class="btn btn-primary">see more</button>
              </div>
            </div>
        `;
        container.appendChild(div);
    })
}


const seeMoreDetails = async (id) => {
//   console.log(id);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`
  );
  const data = await res.json();

//   console.log(data.data[0].details);

  let details = data.data[0];

  const detailContainer = document.getElementById("detail-container");

   detailContainer.textContent = ''

  let div = document.createElement("div");
 
  

  div.innerHTML = `
    <dialog id="my_modal_3" class="modal">
            <form method="dialog" class="modal-box">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div>
                <img class="w-1/2 mx-auto" src="${details.thumbnail_url}" alt="" />
                <p class="font-bold text-2xl">${details.title}</p>
                <p>${details.details}</p>
              </div>
            </form>
          </dialog>

  `;

  detailContainer.appendChild(div);
  
  const modalid = document.getElementById("my_modal_3");
  modalid.showModal();
  
};

newsDisplay('01')

dataLoad();
