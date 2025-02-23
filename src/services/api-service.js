export default class APIServices {

    _apiPhotoBase = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d08104a6baacfd7f04c79dd6076c27c&tag_mode=all&extras=url_m&page${
        Math.floor(Math.random() * Math.floor(5))
        }&per_page=50&format=json&nojsoncallback=1&tags=`;
    ////cors bypassing with proxy
    _apiSoundBase = 'https://api.allorigins.win/get?url=https://www.xeno-canto.org/api/2/recordings?query=';



    async getBirdPhoto(birdName) {
        const res = await fetch(`${this._apiPhotoBase}${encodeURIComponent(birdName)}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${birdName} photo :(` +
                `, received ${res.status}`)
        }

        return await res;
    }

    getPhoto = async (bird) => {
        const photoUrl = await this.getBirdPhoto(bird);
        console.log(photoUrl)

        const reader = photoUrl.body.getReader();
        while(true) {
            const {done, value} = await reader.read();

            if (done) {
                break;
            }
            let result = new TextDecoder("utf-8").decode(value);

            return JSON.parse(result)
        }
    };

    async getBirdSong(birdName) {
        const res = await fetch(`${this._apiSoundBase}${encodeURIComponent(birdName)}+q_lt:A+len:15-30+since:2020-01-01`);
        console.log(`${this._apiSoundBase}${birdName}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${birdName} song :(` +
                `, received ${res.status}`)
        }

        return await res.json();
    }

}