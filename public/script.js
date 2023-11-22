

console.log("im on the front")
fetch("/coucou").then((x)=>x.json()).then((x)=>console.log(x))
function displaylist(){
    fetch("/copain")
        .then((response) => response.json())
        .then((persons) => {
            console.log(persons)
            var result = "";    
            persons.forEach(function (item) {
                result += "<li>" + item.Name + " " + item.last_name + "</li>";
            });
            document.getElementById("demo").innerHTML = result; 
        }); 
}
displaylist() ;
function submitdata(e) {
    e.preventDefault();
    console.log(e.target)
   
    const Myform = document.getElementById('MyForm')
    console.log(MyForm.elements.Name.value, MyForm.elements.last_name.value)
    fetch("/add_copain", { 
        method:"post", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({
            Name:MyForm.elements.Name.value, 
            last_name:MyForm.elements.last_name.value
        }) 

    }) 
    .then(response=> {
        console.log(response)
        displaylist()
    })
}