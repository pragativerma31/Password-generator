const doCopy = document.querySelector("#copy_button");
const input_generate = document.querySelector("#input_generator");
let Output = document.querySelector("#output_value");
const slider = document.querySelector("#myRange");
const checkboxes = document.querySelectorAll(".Checkboxes input[type='checkbox']");
const strengthIndicator = document.querySelector(".indicator");
const generate =document.querySelector("#generate_button");
const  uppercase = document.querySelector("#Upper_case");
const  lowercase = document.querySelector("#Lower_case");
const  nos = document.querySelector("#Nos");
const  symbol = document.querySelector("#Symb");
let CopyMsg = document.querySelector("#copy_msg");
let symbol_list = "+-()*&^%$#@!~?><,.:;{}[]`";
let checkedBoxes = 0;
let password="";
// Slider function 

Output.innerText = slider.value;
let passLength = '7';

function handleSlider() {
    slider.value =passLength;
    Output.innerText = passLength;
}

slider.addEventListener('input' , (e) =>{
    passLength = e.target.value;
    handleSlider();
});

// random number
function  getRndInteger(min , max){
    return Math.floor(Math.random() * (max-min)) + min;
}

//random integer
function getSingleInteger(){
    return getRndInteger(0,9);
}

// lowercase 
function getLowerCase(){
    const CharCode = getRndInteger(97,122);
    return String.fromCharCode(CharCode);
}

//uppercase
function getUpperCase() {
    const CharCode = getRndInteger(65,90);
    return String.fromCharCode(CharCode);
}

//symbols
function getSymbols(){
    const CharCode = getRndInteger(0,symbol_list.length);
    return symbol_list[CharCode];
}


//Copy content 
async function copyContent() {
    try {
        await navigator.clipboard.writeText(input_generate.value);
        CopyMsg.innerText = "Copied";
    } 
    catch (e) {
        CopyMsg.innerText = "Failed to copy";
    }

    // Show the message
    CopyMsg.classList.add("active");

    // Hide the message after 1 second
    setTimeout(() => {
        CopyMsg.classList.remove("active");
    }, 1000);
}

doCopy.addEventListener('click', () => {
    if (input_generate.value) {
        copyContent();
    }
});

//calcstrentgh
function updateStrengthIndicator() {
    let checkedCount = 0;

    // Count how many checkboxes are checked
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    // Update the strength indicator color based on the number of checked checkboxes
    switch (checkedCount) {
        case 1:
            strengthIndicator.style.backgroundColor = "red";
            break;
        case 2:
            strengthIndicator.style.backgroundColor = "orange";
            break;
        case 3:
            strengthIndicator.style.backgroundColor = "yellow";
            break;
        case 4:
            strengthIndicator.style.backgroundColor = "green";
            break;
        default:
            strengthIndicator.style.backgroundColor = "grey"; // Default color when none are selected
    }
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateStrengthIndicator);
});

// Initialize the strength indicator on load
updateStrengthIndicator();


//Generate Function
function shuffle(arr){
    // fisher yates method
    for(i=arr.length-1;i>0;i--){
        let j = Math.floor(Math.random() * (i+1));
        const temp = arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
    let str = "";
    arr.forEach((el) => {
        str+=el;
    });
    console.log("shuffled");
    return str;
}
generate.addEventListener('click', generatePassword);

function generatePassword(){
    //none boxes selected
    console.log("button clicked");
    password = "";


    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedBoxes++;
        }
    })
    if(checkedBoxes <=0 )return;


    //pass length is less than the number of checked boxes
    if(passLength < checkedBoxes){
        passLength=checkedBoxes;
        handleSlider();
    }
    let functionArr = [];

    if(uppercase.checked){
        functionArr.push(getUpperCase);
        console.log(functionArr);
    }
    if(lowercase.checked){
        functionArr.push(getLowerCase);
        console.log(functionArr);
    }
    if(nos.checked){
        functionArr.push(getSingleInteger);
        console.log(functionArr);
    }
    if(symbol.checked){
        functionArr.push(getSymbols);
        console.log(functionArr);
    }

    //compulsory
    for(let i=0; i<functionArr.length;i++){
        password += functionArr[i]();
        console.log("password: ", password)
    }

    //additional
    for(let i=0; i<passLength-functionArr.length;i++){
        let randomIndex = getRndInteger(0,functionArr.length-1);
        password += functionArr[randomIndex]();
        console.log("password: ",password);
    }

    // shuffle password
    password = shuffle(Array.from(password));

    //result;
    input_generate.value = password;

}



