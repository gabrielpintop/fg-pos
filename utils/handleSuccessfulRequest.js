function handleCreateRequest(res, data, elementName, lastLetter) {
    res.status(201).json({
        data: data,
        message: `${elementName} cread${lastLetter}`
    });
}

function handleGetRequest(res, data, elementName, lastSyllable) {
    res.status(200).json({
        data: data,
        message: `${elementName} listad${lastSyllable}`
    });
}

module.exports = {
    handleCreateRequest,
    handleGetRequest
}