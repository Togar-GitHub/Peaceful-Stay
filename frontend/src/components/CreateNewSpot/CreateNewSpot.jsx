import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewSpotThunk, addSpotImageThunk } from '../../store/spot';
import styles from './CreateNewSpot.module.css';

function CreateNewSpot() {
  const [loadingSpot, setLoadingSpot] = useState(false);
  const user = useSelector((state) => state.session.user)
  // const newSpot = useSelector((state) => state.spots.newSpot)
  // const newSpotImage = useSelector((state) => state.spots.newSpotImage)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const incomingSpot = {
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat: latitude,
    lng: longitude,
    name,
    description,
    price,
    previewImage
  };

  useEffect(() => {
    const isValid = country && address && city && state && name && description.length >= 30 && price && previewImage;
    setIsSubmitDisabled(!isValid);
  }, [country, address, city, state, name, description, price, previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    try {
      const newSpot = await dispatch(createNewSpotThunk(incomingSpot));
      console.log('NEW SPOT > ', newSpot);

      if (image1 || image2 || image3 || image4) {
        const images = [image1, image2, image3, image4].filter(img => img);
        console.log('INPUT IMAGES > ', images)
        for (let img of images) {
          console.log('READY FOR POST IMAGES > ', newSpot);
          const incomingSpotImage = {
            spotId: newSpot.id,
            url: img,
            preview: true
          };
          await dispatch(addSpotImageThunk(incomingSpotImage));
        }
      }
      setLoadingSpot(false);

      navigate(`/api/spots/${newSpot.id}`)
    } catch (err) {
      setLoadingSpot(false);
      if (err && err.data && err.data.errors) {
        setErrors(err.data.errors); 
      } else {
        console.error('An error occurred:', err);
        setErrors({ general: 'Something went wrong, please try again later.' });
      }
    }
  };

  if (loadingSpot) {
    return <p style={{ marginTop: '120px' }}>Load Create new Spot...</p>
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className={styles.createMainContainer}>
      <div className={styles.topContainer}>
        <div className={styles.topDescription}>
          <h1>Create a new Spot</h1>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation</p>
        </div>

        <div className={styles.topInputs}>
          <label>
            Country
            <input
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Country'
              required
            />
            {errors.country && <p className={styles.error}>{errors.country}</p>}
          </label>
          <label>
            Street Address
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Address'
              required
            />
            {errors.address && <p className={styles.error}>{errors.address}</p>}
          </label>
          <div className={styles.cityStateContainer}>
            <label>
              City
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
                required
              />
              {errors.city && <p className={styles.error}>{errors.city}</p>}
            </label>
            <p className={styles.comma}>, </p>
            <label>
              State
              <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder='STATE'
                required
              />
              {errors.state && <p className={styles.error}>{errors.state}</p>}
            </label>
          </div>
          <div className={styles.latLngContainer}>
            <label>
              Latitude
              <input
                type='text'
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder='Latitude'
                required
              />
              {errors.latitude && <p className={styles.error}>{errors.latitude}</p>}
            </label>
            <p className={styles.comma}>, </p>
            <label>
              Latitude
              <input
                type='text'
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder='Longitude'
                required
              />
              {errors.longitude && <p className={styles.error}>{errors.longitude}</p>}
            </label>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.midContainer}>
        <div className={styles.midTopContainer}>
          <div className={styles.midTopDescription}>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities,
                like fast wifi or parking, and what you love about the neighborhood.</p>
          </div>
          <div className={styles.midTopInput}>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Please write at least 30 characters'
              required
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>
        </div>
        <hr />
        <div className={styles.midMiddleContainer}>
          <div className={styles.midMiddleDescription}>
            <h2>Create a title for your spot</h2>
            <p>Catch a guests&apos; attention with a spot title that highlights
                what makes your place special.</p>
          </div>
          <div className={styles.midMiddleInput}>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name of your spot'
              required
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
        </div>
        <hr />
        <div className={styles.midBottomContainer}>
          <div className={styles.midBottomDescription}>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out
                and rank higher in search results.</p>
          </div>
          <div className={styles.midBottomInput}>
            <h3 className={styles.dollarSign}>$</h3>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price per night (USD)'
            />
            {errors.price && <p className={styles.error}>{errors.price}</p>}
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.bottomContainer}>
        <div className={styles.bottomDescription}>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
        </div>
        <div className={styles.bottomInput}>
          <input
            type='text'
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder='Preview Image URL'
            required
          />
          {errors.prevImage && <p className={styles.error}>{errors.prevImage}</p>}
          <input
            type='text'
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
            placeholder='Image URL'
          />
          {errors.image1 && <p className={styles.error}>{errors.image1}</p>}
          <input
            type='text'
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
            placeholder='Image URL'
          />
          {errors.image2 && <p className={styles.error}>{errors.image2}</p>}
          <input
            type='text'
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
            placeholder='Image URL'
          />
          {errors.image3 && <p className={styles.error}>{errors.image3}</p>}
          <input
            type='text'
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
            placeholder='Image URL'
          />
          {errors.image4 && <p className={styles.error}>{errors.image4}</p>}
        </div>
      </div>
      <hr />

      <button
        className={styles.createSpotButton}
        type='submit'
        disabled={isSubmitDisabled}>
        Create Spot
      </button>

    </div>
    </form>
    </>
  )
}

export default CreateNewSpot;