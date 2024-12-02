import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewSpotThunk, getSpotDetailThunk, updateSpotThunk } from '../../store/spot';
import { addSpotImageThunk, updateSpotImageThunk, deleteSpotImageThunk } from '../../store/spot';
import cns from './CreateNewSpot.module.css';

function CreateNewSpot() {
  const [loadingSpot, setLoadingSpot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let customProp = useSelector((state) => state.customProp.customProp);
  const [spotData, setSpotData] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });
  const [originalSpotData, setOriginalSpotData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);

  useEffect(() => {
    if (customProp) {
      const getSpotData = async () => {
        setLoadingSpot(true);
        try {
          const spot = await dispatch(getSpotDetailThunk(customProp));
          setOriginalSpotData(spot);
          setSpotData({
            id: spot.id,
            country: spot.country,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            latitude: spot.lat,
            longitude: spot.lng,
            description: spot.description,
            name: spot.name,
            price: spot.price,
            previewImage: spot.previewImage,
            image1: spot.SpotImages[0]?.url || null,
            image2: spot.SpotImages[1]?.url || null,
            image3: spot.SpotImages[2]?.url || null,
            image4: spot.SpotImages[3]?.url || null
          })
        } catch (err) {
          setErrors({ general: 'Error fetching spot data, please try again later.' });
          console.error('Error fetching Spot data:', err);
        } finally {
          setLoadingSpot(false);
        }
      };
      getSpotData();
    }
  }, [customProp, dispatch]);

  useEffect(() => {
    const isValid = 
      spotData.country && 
      spotData.address && 
      spotData.city && 
      spotData.state && 
      spotData.name && 
      spotData.description.length >= 30 && 
      spotData.price && 
      spotData.previewImage;
    setIsSubmitDisabled(!isValid);
  }, [spotData]);

  useEffect(() => {
    const isChanged = Object.keys(spotData).some((key) => spotData[key] !== originalSpotData?.[key]);
    setIsUpdateButtonDisabled(!isChanged);
  }, [spotData, originalSpotData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    setLoadingSpot(true);

    try {
      let returnSpot;
      if (customProp) {
        const incomingSpot = {
          address: spotData.address,
          city: spotData.city,
          state: spotData.state,
          country: spotData.country,
          lat: Number(spotData.latitude),
          lng: Number(spotData.longitude),
          name: spotData.name,
          description: spotData.description,
          price: Number(spotData.price),
          previewImage: spotData.previewImage
        }
        returnSpot = await dispatch(updateSpotThunk(customProp, incomingSpot))

        if (returnSpot) {
          const oldImagesId = [
            originalSpotData.SpotImages[0]?.id || null,
            originalSpotData.SpotImages[1]?.id || null,
            originalSpotData.SpotImages[2]?.id || null,
            originalSpotData.SpotImages[3]?.id || null
          ]
          const oldImages = [
            originalSpotData.SpotImages[0]?.url || null,
            originalSpotData.SpotImages[1]?.url || null,
            originalSpotData.SpotImages[2]?.url || null,
            originalSpotData.SpotImages[3]?.url || null
          ]
          const newImages = [
            spotData.image1,
            spotData.image2,
            spotData.image3,
            spotData.image4
          ]

          for (let i = 0; i < 4; i++) {
            const oldImageId = oldImagesId[i];
            const oldImage = oldImages[i];
            const newImage = newImages[i];
          
            if (newImage && !oldImage) {
              const incomingSpotImage = {
                spotId: Number(customProp),
                url: newImage,
                preview: true
              };
              await dispatch(addSpotImageThunk(incomingSpotImage));
            }

            if (!newImage && oldImage) {
              const imageIdToDelete = oldImageId;
              if (imageIdToDelete) {
                await dispatch(deleteSpotImageThunk(imageIdToDelete));
              }
            }

            if (newImage && oldImage && newImage !== oldImage) {
              const imageIdToUpdate = oldImageId;
              if (imageIdToUpdate) {
                const incomingUpdateSpotImage = {
                  spotId: returnSpot.id,
                  url: newImage,
                  preview: true
                }
                await dispatch(updateSpotImageThunk(imageIdToUpdate, incomingUpdateSpotImage));
              }
            }
          }
        }
      } else {

        const newSpot = {
          address: spotData.address,
          city: spotData.city,
          state: spotData.state,
          country: spotData.country,
          lat: Number(spotData.latitude),
          lng: Number(spotData.longitude),
          name: spotData.name,
          description: spotData.description,
          price: Number(spotData.price),
          previewImage: spotData.previewImage
        }
        returnSpot = await dispatch(createNewSpotThunk(newSpot));

        if (returnSpot) {
          if (spotData.image1 || 
              spotData.image2 || 
              spotData.image3 || 
              spotData.image4) {
                const images = [
                  spotData.image1, 
                  spotData.image2, 
                  spotData.image3, 
                  spotData.image4
                ].filter(img => img);

                for (let img of images) {
                  const incomingSpotImage = {
                    spotId: returnSpot.id,
                    url: img,
                    preview: true
                  };
                  await dispatch(addSpotImageThunk(incomingSpotImage));
                }
              }
            }
        }
        setLoadingSpot(false);
        customProp = returnSpot.id;
        navigate(`/spotDetail/${customProp}`)
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
    <div className={cns.createMainContainer}>
      <div className={cns.topContainer}>
        <div className={cns.topDescription}>
          <h1>{customProp ? 'Update Your Spot' : 'Create a New Spot'}</h1>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation</p>
        </div>

        <div className={cns.topInputs}>
          <label>
            Country
            <input
              type='text'
              value={spotData.country}
              onChange={(e) => setSpotData({ ...spotData, country: e.target.value })}
              placeholder='Country'
              required
            />
            {errors.country && <p className={cns.error}>{errors.country}</p>}
          </label>
          <label>
            Street Address
            <input
              type='text'
              value={spotData.address}
              onChange={(e) => setSpotData({ ...spotData, address: e.target.value })}
              placeholder='Address'
              required
            />
            {errors.address && <p className={cns.error}>{errors.address}</p>}
          </label>
          <div className={cns.cityStateContainer}>
            <label>
              City
              <input
                type='text'
                value={spotData.city}
                onChange={(e) => setSpotData({ ...spotData, city: e.target.value })}
                placeholder='City'
                required
              />
              {errors.city && <p className={cns.error}>{errors.city}</p>}
            </label>
            <p className={cns.comma}>, </p>
            <label>
              State
              <input
                type='text'
                value={spotData.state}
                onChange={(e) => setSpotData({ ...spotData, state: e.target.value })}
                placeholder='STATE'
                required
              />
              {errors.state && <p className={cns.error}>{errors.state}</p>}
            </label>
          </div>
          <div className={cns.latLngContainer}>
            <label>
              Latitude
              <input
                type='text'
                value={spotData.latitude}
                onChange={(e) => setSpotData({ ...spotData, latitude: e.target.value })}
                placeholder='Latitude'
                required
              />
              {errors.latitude && <p className={cns.error}>{errors.latitude}</p>}
            </label>
            <p className={cns.comma}>, </p>
            <label>
              Latitude
              <input
                type='text'
                value={spotData.longitude}
                onChange={(e) => setSpotData({ ...spotData, longitude: e.target.value })}
                placeholder='Longitude'
                required
              />
              {errors.longitude && <p className={cns.error}>{errors.longitude}</p>}
            </label>
          </div>
        </div>
      </div>
      <hr />
      <div className={cns.midContainer}>
        <div className={cns.midTopContainer}>
          <div className={cns.midTopDescription}>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities,
                like fast wifi or parking, and what you love about the neighborhood.</p>
          </div>
          <div className={cns.midTopInput}>
            <input
              type='text'
              value={spotData.description}
              onChange={(e) => setSpotData({ ...spotData, description: e.target.value })}
              placeholder='Please write at least 30 characters'
              required
            />
            {errors.description && <p className={cns.error}>{errors.description}</p>}
          </div>
        </div>
        <hr />
        <div className={cns.midMiddleContainer}>
          <div className={cns.midMiddleDescription}>
            <h2>Create a title for your spot</h2>
            <p>Catch a guests&apos; attention with a spot title that highlights
                what makes your place special.</p>
          </div>
          <div className={cns.midMiddleInput}>
            <input
              type='text'
              value={spotData.name}
              onChange={(e) => setSpotData({ ...spotData, name: e.target.value })}
              placeholder='Name of your spot'
              required
            />
            {errors.name && <p className={cns.error}>{errors.name}</p>}
          </div>
        </div>
        <hr />
        <div className={cns.midBottomContainer}>
          <div className={cns.midBottomDescription}>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out
                and rank higher in search results.</p>
          </div>
          <div className={cns.midBottomInput}>
            <h3 className={cns.dollarSign}>$</h3>
            <input
              type='number'
              value={spotData.price}
              onChange={(e) => setSpotData({ ...spotData, price: e.target.value })}
              placeholder='Price per night (USD)'
            />
            {errors.price && <p className={cns.error}>{errors.price}</p>}
          </div>
        </div>
      </div>
      <hr />
      <div className={cns.bottomContainer}>
        <div className={cns.bottomDescription}>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
        </div>
        <div className={cns.bottomInput}>
          <input
            type='text'
            value={spotData.previewImage}
            onChange={(e) => setSpotData({ ...spotData, previewImage: e.target.value })}
            placeholder='Preview Image URL'
            required
          />
          {errors.prevImage && <p className={cns.error}>{errors.prevImage}</p>}
          <input
            type='text'
            value={spotData.image1}
            onChange={(e) => setSpotData({ ...spotData, image1: e.target.value })}
            placeholder='Image URL'
          />
          {errors.image1 && <p className={cns.error}>{errors.image1}</p>}
          <input
            type='text'
            value={spotData.image2}
            onChange={(e) => setSpotData({ ...spotData, image2: e.target.value })}
            placeholder='Image URL'
          />
          {errors.image2 && <p className={cns.error}>{errors.image2}</p>}
          <input
            type='text'
            value={spotData.image3}
            onChange={(e) => setSpotData({ ...spotData, image3: e.target.value })}
            placeholder='Image URL'
          />
          {errors.image3 && <p className={cns.error}>{errors.image3}</p>}
          <input
            type='text'
            value={spotData.image4}
            onChange={(e) => setSpotData({ ...spotData, image4: e.target.value })}
            placeholder='Image URL'
          />
          {errors.image4 && <p className={cns.error}>{errors.image4}</p>}
        </div>
      </div>
      <hr />

      <button 
        className={cns.createSpotButton}
        type='submit'
        disabled={customProp ? isUpdateButtonDisabled : isSubmitDisabled}>
        {customProp ? 'Update Spot' : 'Create Spot'}
      </button>

    </div>
    </form>
    </>
  )
}

export default CreateNewSpot;