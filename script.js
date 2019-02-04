const form = document.getElementById('isi-compare');

form.addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById('display').innerHTML = "";
    comparisonTime();
});

comparisonTime = () => {
	const oldIsiDiv = document.getElementById('original-isi');
	const newIsiDiv = document.getElementById('new-isi');

   const oldIsi = oldIsiDiv.innerHTML;
   const newIsi = newIsiDiv.innerHTML;

   const oldIsiContent = oldIsiDiv.innerText;
   const newIsiContent = newIsiDiv.innerText;

   const oldIsiChildren = oldIsiDiv.childNodes;
   const newIsiChildren = newIsiDiv.childNodes;

   // const removeInnerTextRegex = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/;
   // debugger;

   // Comparing just the content (no HTML)
   comparisonIsiContent(oldIsiContent, newIsiContent);

   // Comparing just the HTML (no content)
   comparisonIsiHTML(oldIsiChildren, newIsiChildren);
};

comparisonIsiContent = (oldContent, newContent) => {
   const cDiff = JsDiff.diffWords(oldContent, newContent);
	const fragment = document.createDocumentFragment();
   const contentComparison = document.getElementById('content-comparison');

   cDiff.forEach(function(word) {
      color = word.added ? 'yellow' : word.removed ? 'red' : 'white';
      span = document.createElement('span');
      span.style.backgroundColor = color;
      span.appendChild(document.createTextNode(word.value));
      fragment.appendChild(span);
   });

   contentComparison.appendChild(fragment);
};

comparisonIsiHTML = (oldHTML, newHTML) => {
	const fragment = document.createDocumentFragment();
  const htmlComparison = document.getElementById('html-comparison');

  // Convert child element nodelists to arrays
  oldHTML = Array.prototype.slice.call(oldHTML);
  newHTML = Array.prototype.slice.call(newHTML);

  // New arrays with all elements (child and grandchild and etc)
  let allOldHTML = [];
  let allNewHTML = [];

  // Check each element in array for elements
  // Recursively check each child element for grand children
  // Base case = 0 children
  // Push element to the new array
  findTheChildren = (array) => {
    // Remove text nodes so only HTML elements are added to new array
    let cleanArray = [];
    array.forEach(function(ele) {
      if(ele.nodeName !== "#text") {
        cleanArray.push(ele);
      }
    });

    // For each element, get to the deepest childNode 

    // Store that node in a new array
    // Remove node from heirarchy
    // Move to parent and recursion
    let monkeybread = [];
    cleanArray.forEach(function(ele) {
      childLookup = (HTMLelement) => {
        if (HTMLelement.childNodes.length > 0) {
          childLookup(HTMLelement.childNodes[0]);
        }
        debugger;
        monkeybread.push(HTMLelement.parentNode);
      }
      childLookup(ele);
    })
  }

  // findTheChildren = (array) => {
  //   debugger;
  //   array.forEach(function(childEle) {
  //     if(childEle.childNodes.length === undefined) {

  //     } else {

  //  		}
  //  	})

  //  	// array.forEach(function(childEle) {
	 //   // 	if (childEle.nodeName === "#text") {
	 //   // 		childEle = Array.prototype.slice.call(array);
	 //   // 		findTheChildren(childEle);		
	 //   // 	}

	 //   // 	if (childEle.childNodes.length < 1) {
	 //   // 		allNewHTML.push(childEle);
	 //   // 		debugger;
	 //   // 	}
  //  	// });
   	
	 //   // findTheChildren(array.childNodes);		
  //  };

   findTheChildren(oldHTML);
   findTheChildren(newHTML);



   // clear original ISI content
   // oldHTML.forEach(function (element) {
   // 	if (element.nodeName != "#text") {
   // 		element.textContent = "";
   // 	}
   // })

   // clear new ISI content
   // newHTML.forEach(function (element) {
   // 	if (element.nodeName != "#text") {
   // 		element.textContent = "";
   // 	}
   // })

   const hDiff = JsDiff.diffArrays(oldHTML, newHTML);

   hDiff.forEach(function(word) {
      color = word.added ? 'yellow' : word.removed ? 'red' : 'white';
      span = document.createElement('span');
      span.style.backgroundColor = color;
      span.appendChild(document.createTextNode(word.value));
      fragment.appendChild(span);
   });

   htmlComparison.appendChild(fragment);
}

// comparisonTime = () => {
//     const oldIsi = document.getElementById('original-isi').innerHTML;
//     const newIsi = document.getElementById('new-isi').innerHTML;
//     const diff = JsDiff.diffCss(oldIsi, newIsi);
//     // const diff = JsDiff.diffWords(oldIsi, newIsi);
//     // const diff = JsDiff.diffLines(oldIsi, newIsi);
//     const fragment = document.createDocumentFragment();
//     const display = document.getElementById('display');
//     const deletedText = document.getElementById('deletedText');
//     const addedText = document.getElementById('addedText');

//     let color = '';
//     let span = null;
//     let htmlObject;

//     // Revisit regex
//     // May need to do a different approach
//     // const regex = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;
//     // const regex_v2 = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<(?!sup\s*\/?)[^>]+>)/g;

//     diff.forEach(function(word) {
//         debugger;
//         color = word.added ? 'yellow' : word.removed ? 'red' : 'white';
//         span = document.createElement('span');
//         span.style.backgroundColor = color;
//         span.appendChild(document.createTextNode(word.value));
//         fragment.appendChild(span);

//         if (span.style.backgroundColor === 'red') {
//             htmlObject = document.createElement('span');
//             htmlObject.innerHTML = span.innerHTML;
//             deletedText.insertAdjacentHTML('beforeend', htmlObject.innerHTML);
//         } else if (span.style.backgroundColor === 'yellow') {
//             htmlObject = document.createElement('span');
//             htmlObject.innerHTML = span.innerHTML;
//             addedText.insertAdjacentHTML('beforeend', htmlObject.innerHTML);
//         } else {
//             htmlObject = document.createElement('span');
//             htmlObject.innerHTML = span.innerHTML;
//             addedText.insertAdjacentHTML('beforeend', htmlObject.innerHTML);
//             deletedText.insertAdjacentHTML('beforeend', htmlObject.innerHTML);
//         }
//     });

//     display.appendChild(fragment);

//     // Render old ISI as HTML
//     const regexDeletedTextDiv = document.getElementById('regexDeletedText');
//     const regDelSpan = document.createElement('span');
//     regDelSpan.innerHTML = deletedText.innerText;
//     regexDeletedTextDiv.insertAdjacentHTML('beforeend', regDelSpan.innerHTML);
//     // End render

//     // Render new ISI as HTML
//     const regexAddedTextDiv = document.getElementById('regexAddedText');
//     const regAddSpan = document.createElement('span');
//     regAddSpan.innerHTML = addedText.innerText;
//     regexAddedTextDiv.insertAdjacentHTML('beforeend', regAddSpan.innerHTML);
//     // End render

//     const insideRegDel = regexDeletedTextDiv.textContent;
//     const insideRegAdd = regexAddedTextDiv.textContent;
//     const diffReg = JsDiff.diffWords(insideRegDel, insideRegAdd);
//     const combinedDiv = document.getElementById('combinedText');

//     diffReg.forEach(function(word) {
//         color = word.added ? 'yellow' : word.removed ? 'red' : 'white';
//         span = document.createElement('span');
//         span.style.backgroundColor = color;
//         span.appendChild(document.createTextNode(word.value));
//         combinedDiv.appendChild(span);

//         // Match the innerText with the textcontent of regexDeletedTextDiv 
//         // Replace the match with span
//         if ( regexDeletedTextDiv.textContent.includes(span.innerText) ){
//         	let startPosition = regexDeletedTextDiv.textContent.indexOf(span.innerText);
//         	let endPosition = regexDeletedTextDiv.textContent[span.innerText.length - 1];

        	
//         }
//     });




    // let cleanedDeletedText = document.getElementById('deletedText').innerText;
    // // Running 120 removes all content and only leaves the HTML
    // // Maybe use this to be the comparison for what to highlight red and yellow?
    // // I should probably just archive this and restart

    // // Plan of attack: 
    // // Take what's in deletedText and render it as HTML in the regex thing. 
    // // Then maybe use this regex to identify what was highlighted red and added a span around that content???
    // // LOL good luck
    // cleanedDeletedText = cleanedDeletedText.match(regex_v2).join('');
    // debugger;
    // console.log(cleanedDeletedText);
    // // debugger;

    // // document.getElementById('regexDeletedText').innerHTML = cleanedDeletedText;
    // let x = document.createElement('span');
    // x.innerHTML = cleanedDeletedText;
    // document.getElementById('regexDeletedText').insertAdjacentHTML('beforeend', x.innerHTML);


    // display.childNodes.forEach(function(spanTag) {
    // 	if (spanTag.style.backgroundColor === 'red') {
    // 		let spanArray = spanTag.innerText.split('');
    // 		spanArray.find(function(elem) {
    // 			if (elem === '>') {
    // 				let currentPosition = spanArray.indexOf(elem);
    // 				let nextPosition = currentPosition + 1;

    // 				if (spanArray[nextPosition] !== "<") {
    // 					console.log(spanArray[nextPosition]);
    // 				}
    // 			}
    // 		})
    // 	}
    // })



    // let newDiv = document.createElement('div');
    // newDiv.setAttribute('id', 'deletedHTML');



    // const childElements = display.children;
    // let childCounter = 0;
    // while(childCounter < childElements.length) {
    // 	if(childElements[childCounter].attributes.length) {
    // 	}
    // 	childCounter++;
    // }
// }