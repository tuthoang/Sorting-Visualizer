
var num_el_range = document.querySelector("#myRange");
console.log(num_el_range.value);
num_el_range.addEventListener("change", (ev) => {
    let num_el = ev.target.value;
    let plot_div = document.querySelector("#plot")
    while(plot_div.firstChild) {
        plot_div.removeChild(plot_div.lastChild);
    }
    console.log(ev.target.value);
    for(let i = 0; i < num_el; i++){
        let block = document.createElement("DIV");
        block.classList.add("blocks");
        block.style.height = Math.ceil(Math.random()*ev.target.value)+"px";
        // block.style.left = ev.target.value; 
        // console.log(Math.random()*ev.target.value);
        console.log(block.style.height);
        document.querySelector("#plot").appendChild(block);
    }
})

