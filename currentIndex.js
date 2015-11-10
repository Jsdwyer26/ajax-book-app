// wait for DOM to load before running JS
$(function() {

	// check to make sure JS is loaded
	console.log('JS is loaded!');

	// your code here
	//element to display books...where the results get appended to
	var $bookList = $('#book-list');
	
	//base URL
	var rootUrl = "https://super-crud.herokuapp.com/books";

	//Empty array to add/hold API retreived book data 
	var bookCollection = [];

	//Form Id for CreateBook
	var $newBook = $('#newBook');

	//Step 4 (HandleBars): Compile your template in main.js. Calling Handlebars.compile(source)
	//returns a function which is saved to the variabe template(from html). We will later use our new
	//new template function to pass in the data we want to render in the template
	var source = $('#book-template').html();
	//Setting up the ability to pass in data through our template.(A function). 
	var template = Handlebars.compile(source);
	console.log(template);
	
	/*function render() {	
		$booksList.empty();

		//Step2. Pass in data through our template. Step 2 is(or seems to be) the crux of getting the books into handlebars/html format
		var booksHtmlReady = template({ taco: data.books });
		//sanity check
		console.log(booksHtmlReady);
		
		//Step3 appending it to the screen
		$booksList.append(booksHtmlReady);
    }*/

    //See a list of all books.
	$.get(rootUrl, function (data) {
		//Step2. Pass in data through our template. Step 2 is(or seems to be) the crux of getting the books into handlebars/html format
		var booksHtmlReady = template({ taco: data.books });
		//sanity check
		console.log(booksHtmlReady);
		//bookCollection = booksHtmlReady;
		//Step3 appending it to the screen
		$bookList.append(booksHtmlReady);
	});

	//Add(POST) books
	//Set-up newBook form submission. Need the submit to be submitted before executing the add(POST).
	$newBook.on('submit', function (e) {
		//searlize() form data entries. Needs to be done before the POST request
		//Seralize, not .val() --.val() would have to be set-up for each input feild on the form...I think?
		var addedBook = $(this).searlize();

		//Now submitt is listened to: POST request(add) for added books 
		$.post(rootUrl, addedBook, function (data) {
			//adding the book to our array of all the books(entireBooks)
			bookCollection.push(data);
		}); //POST closing brace
	}); //closing submit event-listen brace


	//Test Post
//$.post('rootUrl', {title: "Adventures of John", author: "john dwyer", image: null, releaseDate: "June 26, 1991"}, function(data){console.log("test")});


}); /*Closing DOM load brace*/