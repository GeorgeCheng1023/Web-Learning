const data = [];
let motion = prompt("What do you want to do?");
while (motion != "quit") {
    motion = prompt("What do you want to do?");
    if (motion === "add") {
        let newData = prompt("What do you want to add?");
        data.push(newData);
    } else if (motion === "list") {
        console.log(data);
    } else if (motion === "delete") {
        let delIndex = prompt("What do you want to delete?");
        for (let i = 0; i < data.length; i++) {
            if (data[i] === delIndex) {
                data.splice(i, 1);
                console.log(data);
                break;
            }
        }
    }
}