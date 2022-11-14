async function fetchPosts() 
{
    response = await fetch("http://jsonplaceholder.typicode.com/posts");
    data = await response.json();

    data.map((data) => 
    {
        let postTitleWordCheck = wordCount(data.title);
        if (postTitleWordCheck > 6) 
        {
        console.log(data.title);
        }
    });

    let bodyData;
    data.map((data) => 
    {
        bodyData += JSON.stringify(data.body);
    });

    let freq = newFreqMap(bodyData);
    console.log(freq);
}

function wordCount(str) 
{
    let arr = str.split(" ");
    return arr.filter((word) => word !== "").length;
}

function newFreqMap(str) 
{
    let frequencyMap = str.split(" ").map((i, j) => 
    {
        return {
            Word: i,
            Freq: str.split(" ").filter((j) => j === i).length,
        };
    });

    let frequencyArr = Array.from(new Set(frequencyMap.map(JSON.stringify)));
    return frequencyArr;
}

fetchPosts();
fetchPosts();
