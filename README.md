## Day to dusk
This is a simple app to apply dust effect to property images using the [Replicate](https://replicate.com/).

First upload and image which is stored in firebase, and an image url is retrieved. Some configurations from the user is taken and using the Replicate api the effects are applied.

Input             |  Output
:-------------------------:|:-------------------------:
![Screenshot 2024-02-21 at 10 08 10](https://github.com/ishrak-imam/day-to-dusk/assets/16683923/2c043469-ce21-4579-86bf-3364513fba0b)  |  ![Screenshot 2024-02-21 at 10 08 22](https://github.com/ishrak-imam/day-to-dusk/assets/16683923/ba960653-b041-4c36-9360-a29d1eacb2a2)

The application is deployed on Vercel https://day-to-dusk-flax.vercel.app/
However, the hobby tier in vercel does't allow more than 5 seconds of request timeout. So the values for `Conditioning Scale` and `Number of decision steps` should be choosen very low to get an output.

But the project can be run locally to experience in full. Please follow the next steps.

Create a `.env.local` file and put the following env variables.

```
NEXTAUTH_URL=
NEXTAUTH_SECRET=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
REPLICATE_API_KEY=
```


then, run the development server:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sample user
```
email: user0@example.com
password: 123456
```


## Project Features:
- [X] Auth done with firebase but without signup (sample user is provided)
- [X] Upload image to firebase and apply effect with replicate
- [X] Download image
- [ ] View previous images


#### Future modifications:
- The previously modified images are not available right now. But it can be easily added by using firebase db. A rough plan could be to upload the modified image to fibasebase storage and persist a mapping of the userId, inputImage, outputImage in the firebase db to maintain a history.
