

const APIKEY:string = "60f06bb755213c4c8e5887d8f7b59046" 


const weatherLink: string = `https://api.openweathermap.org/data/2.5/weather?q=cebu&appid=${APIKEY}`


interface ResponseObject {
    status:string;
    data: any
}


async function testFunction(url:string): Promise<ResponseObject> {
        try {
            const test = fetch(url)
            const result = await test
            const results = await result.json()
            // console.log(results)
            return {
                status: 'success',
                data: await results
            }
        } catch {
            return {
                status: 'success',
                data:"Error bitch"
            }
        }
}

const test = testFunction(weatherLink)

async function callbackTest (val:object) {
    console.log(val)
}

callbackTest(test)




