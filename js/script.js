
var plot_div = document.querySelector("#plot");
var animation_speed = 50; //ms
var num_el_range = document.querySelector("#myRange");
var sort_id = -1;

var sort_divs = [
    document.querySelector("#selection"),
    document.querySelector("#bubble"),
    document.querySelector("#insertion"),
    document.querySelector("#quick"),
    document.querySelector("#merge"),
    document.querySelector("#reinit")

]

window.onload = function(ev){
    populate(num_el_range.value);
    // addClicks();
};


function populate(num_el){
    // let num_el = ev.target.value;

    for (let i = 0; i < num_el; i++) {
        let block = document.createElement("DIV");
        block.classList.add("blocks");
        block.style.height = Math.floor(Math.random() * 100) + "%";
        block.style.width = Math.floor(100 / num_el) + "%";
        block.style.maxWidth = "2%";
        plot_div.appendChild(block);
    }
}

num_el_range.addEventListener("change", (ev) => {
    while(plot_div.firstChild) {
        plot_div.removeChild(plot_div.lastChild);
    }
    console.log(ev.target.value);
    let num_el = ev.target.value;
    populate(num_el);
});

// Change the animation speed
document.querySelector("#speedRange").addEventListener("change", (ev) => {
    animation_speed = 1000*1/ev.target.value;
});

function getArray(){
    let plot_div = document.querySelector("#plot");
    let arr = [];
    let children = plot_div.children;
    for (let i = 0; i < children.length; i++){
        arr.push(children[i].clientHeight);
        // console.log(children[i].clientHeight);
    }
    return arr;
}

document.querySelector("#reinit").addEventListener(
    "click", async() => {
        while (plot_div.firstChild) {
            plot_div.removeChild(plot_div.lastChild);
        }
        populate(num_el_range.value);
    }
)
document.querySelector("#selection").addEventListener(
    "click", async () => {
        document.querySelector("#selection").classList.add("boldify");
        removeClicks()
        sort_id = 0;
        let arr = getArray();
        arr = await selectionSort(arr);
        addClicks();
        document.querySelector("#selection").classList.remove("boldify");

    }
)
document.querySelector("#bubble").addEventListener(
    "click", async () => {
        document.querySelector("#bubble").classList.add("boldify");
        removeClicks();
        sort_id = 1;
        let arr = getArray();
        arr = await bubbleSort(arr);
        addClicks();
        document.querySelector("#bubble").classList.remove("boldify");

    }
)

document.querySelector("#insertion").addEventListener(
    "click", async () => {
        document.querySelector("#insertion").classList.add("boldify");
        removeClicks();
        sort_id = 2;
        let arr = getArray();
        arr = await insertionSort(arr);
        addClicks();
        document.querySelector("#insertion").classList.remove("boldify");

    }
)

document.querySelector("#quick").addEventListener(
    "click", async () => {
        document.querySelector("#quick").classList.add("boldify");
        removeClicks();
        sort_id = 3;
        let arr = getArray();
        arr = await quickSort(arr, 0, arr.length - 1);
        addClicks();
        document.querySelector("#quick").classList.remove("boldify");


    }
)
document.querySelector("#merge").addEventListener(
    "click", async () => {
        document.querySelector("#merge").classList.add("boldify");
        removeClicks();
        sort_id = 4;
        let arr = getArray();
        arr = await mergeSort(arr, 0, arr.length - 1);
        addClicks();
        document.querySelector("#merge").classList.remove("boldify");

    }
)
function addClicks(){

    // document.querySelector("#selection").classList.add("hover-class")
    // document.querySelector("#bubble").classList.add("hover-class")
    // document.querySelector("#insertion").classList.add("hover-class")
    // document.querySelector("#quick").classList.add("hover-class")
    // document.querySelector("#merge").classList.add("hover-class")
    for (let i = 0; i < sort_divs.length; i++) {
        sort_divs[i].classList.add("enable-pointer")
        sort_divs[i].classList.remove("disable-pointer")
    }
    num_el_range.classList.remove("disable-pointer")
    console.log("adding")
}

function removeClicks(){
    // document.querySelector("#selection").classList.add("hover-remove")
    // document.querySelector("#bubble").classList.add("hover-remove")
    // document.querySelector("#insertion").classList.add("hover-remove")
    // document.querySelector("#quick").classList.add("hover-remove")
    // document.querySelector("#merge").classList.add("hover-remove")
    // console.log(document.querySelector("#selection").style.pointerEvents)
    for (let i = 0; i < sort_divs.length; i++) {
        sort_divs[i].classList.add("disable-pointer")
        sort_divs[i].classList.remove("enable-pointer")
    }
    num_el_range.classList.add("disable-pointer")


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateSwap(i, j) {

    plot_div.children[i].style.backgroundColor = "#ff3232";
    plot_div.children[j].style.backgroundColor = "#ff3232";

    // Move ith child infront of j
    await sleep(animation_speed)
    plot_div.insertBefore(plot_div.children[i], plot_div.children[j])
    await sleep(animation_speed)

    // Move original jth child to where i was
    if(j+1 < plot_div.children.length)
        plot_div.insertBefore(plot_div.children[j+1], plot_div.children[i+1])

    plot_div.children[i].style.backgroundColor = "#198CFF";
    plot_div.children[j].style.backgroundColor = "#198CFF";
}

async function animateInsert(i, j) {

    plot_div.children[i].style.backgroundColor = "#ff3232";
    plot_div.children[j].style.backgroundColor = "#ff3232";

    // Move ith child infront of j
    await sleep(animation_speed)
    plot_div.insertBefore(plot_div.children[i], plot_div.children[j])
    // await sleep(10)

    // ith position is now the jth position
    // jth position is now the jth + 1 position
    plot_div.children[j].style.backgroundColor = "#198CFF";
    plot_div.children[j+1].style.backgroundColor = "#198CFF";
}

async function selectionSort(arr) {

    len = arr.length;
    for (let i = 0; i < len; i++) {
        let min_ind = i;
        for (let j = i+1; j < len; j++) 
            if (arr[j] < arr[min_ind]) 
                min_ind = j;

        let tmp = arr[i];
        arr[i] = arr[min_ind];
        arr[min_ind] = tmp;
        await animateSwap(min_ind, i);
    }
    return arr;
}

async function bubbleSort(arr) {

    len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
                await animateSwap(j + 1, j);
            }
            if (sort_id != 1)
                return arr
        }
    }
    return arr;
}

async function insertionSort(arr) {

    len = arr.length;

    for(let i = 0; i < len; i++) {
        let ind = i;
        while(ind > 0 && arr[ind-1] > arr[ind]) {
            let tmp = arr[ind];
            arr[ind] = arr[ind-1];
            arr[ind-1] = tmp;
            await animateSwap(ind,ind-1);
            ind--;
        }

    }

    return arr;
}

async function quickSort(arr, lo, hi) {
    if (lo < hi){
        p = await partition(arr, lo, hi);
        quickSort(arr, lo, p-1);
        quickSort(arr, p+1, hi);
    }
    return arr;
}

async function partition(arr, lo, hi) {
    let pivot = arr[hi];

    let i = lo-1;
    for (let j = lo; j < hi; j++){
        if(arr[j] < pivot){
            i++;
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            await animateSwap(j, i);
        }
    }
    let tmp = arr[i+1];
    arr[i+1] = pivot;
    arr[hi] = tmp;
    await animateSwap(hi, i+1);
    return i+1;
}

async function mergeSort(arr, lo, hi) {
    if (lo < hi){
        let mid = Math.floor((lo+hi)/2);

        await mergeSort(arr, lo, mid);
        await mergeSort(arr, mid+1, hi);
        await merge(arr, lo, mid, hi);
    }

}

async function merge(arr, lo, mid, hi){
    let tmp_arr = new Array(hi-lo+1)
    let ind_arr = new Array(hi-lo+1)
    let p = lo;
    let q = mid+1;
    let k = 0;

    while(p <= mid && q <= hi){
        if(arr[p] <= arr[q]){
            tmp_arr[k] = arr[p];
            ind_arr[k] = p;

            p++;
            k++;
        }
        else{
            tmp_arr[k] = arr[q];
            ind_arr[k] = q;

            k++;
            q++;
        }
    }
    while(p <= mid){
        tmp_arr[k] = arr[p];
        ind_arr[k] = p;

        p++;
        k++;
    }
    while (q <= hi) {
        tmp_arr[k] = arr[q];
        ind_arr[k] = q;

        k++;
        q++;
    }

    for(let i = lo; i <= hi; i++){
        arr[i] = tmp_arr[i-lo];
        if (ind_arr[i-lo] > i)
            await animateInsert(ind_arr[i-lo], i);
    }
}
