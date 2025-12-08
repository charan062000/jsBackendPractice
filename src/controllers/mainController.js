

export const getHomepage = (req, res) => {
    res.send("this is response from the main controller from controller folder")
}
export const createData = (req, res) => {
    const yourdata = req.body;
  
    console.log("recived data:", yourdata);
    res.json({
        message: "data recived successfully",
        // yourdata:yourdata
    })
}