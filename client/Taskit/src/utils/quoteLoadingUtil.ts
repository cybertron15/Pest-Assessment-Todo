
function loadInspirationalQuote() {
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            let x = Math.floor((Math.random() * 10) + (data.length - 10))
            const quote = data[x].text
            const author = data[x].author.split(',')[0]
            console.log(quote, author);
            return {quote, author}
        })
        .catch((err)=>{
            console.log("Failed to fetch quote",err);
            return {quote:"A house divided against itself cannot stand.", author:"Abraham Lincoln"}
        })
}

export default loadInspirationalQuote