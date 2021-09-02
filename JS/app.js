const searchBook = () => {
    const searchValue = document.getElementById('inputBook');
    const searchText = searchValue.value;
    document.getElementById('searchingText').innerHTML = `You Are Searching For: <span class="text-danger"> ${searchText}</span>`;

    searchValue.value = '';
    notification('hidden')
    resultCount('none')
    searchResult('hidden')
    toggleSpinner('block')

    const url = `https://openlibrary.org/search.json?q=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs.slice(0, 20)))
    fetch(url)
        .then(res => res.json())
        .then(data => numFound(data.numFound))

}

// spinner show on load 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;


}

// spinner loading Disable result 

const searchResult = displayStyle => {
    document.getElementById('search-result').style.visibility = displayStyle;


}

// Disable Enable message 
const notification = displayStyle => {
    document.getElementById('notify').style.visibility = displayStyle;



}
const resultCount = displayStyle => {
    document.getElementById('totalBook').style.display = displayStyle;
    document.getElementById('result').style.display = displayStyle;


}

// total boook count
const numFound = numFound => {
    if (numFound !== 0) {
        resultCount('inline-block')
        document.getElementById('totalBook').innerText = `${numFound} Book  `;


    }

}





// show result 

const displayBook = books => {
    const searchBook = document.getElementById('search-result');
    searchBook.innerHTML = '';
    console.log(books);
    if (books.length === 0) {

        document.getElementById('notify').innerText = "Book Not Found !";
        notification('visible');
        resultCount('none');
        toggleSpinner('none');
    } else {
        document.getElementById('result').innerText = `Show ${books.length} Of `;
        resultCount('inline-block');

        document.getElementById('notify').innerText = "";
        books.forEach(book => {

            const div = document.createElement('div');

            div.classList.add('col');
            div.innerHTML = `
                        <div class=" card card_box shadow-sm">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-thumbnail shadow-sm rounded-3 img-fluid" min-height="100px" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.title.slice(0, 15)}</h5>
                            <p class="card-text text-primary"><span class="text-dark">Author:</span> ${book?.author_name}</p>
                            <p class="card-text"><span class="text-secondary">Publisher:</span> ${book?.publisher}</p>
                            <p class="card-text"><span class="text-secondary">1st Published:</span> ${book.first_publish_year}</p>
                        </div>
                        </div>
                        `
            searchBook.appendChild(div);


        });
        searchResult('visible')
        toggleSpinner('none')




    }
}