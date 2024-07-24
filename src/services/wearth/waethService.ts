import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
  // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
  const weatherId = res.data.weather[0].id;

  // 날씨 아이콘 가져오기
  const weatherIcon = res.data.weather[0].icon;
  const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  // 소수점 버리기
  const temp = Math.round(res.data.main.temp);

  const data = {
    weatherIconAdrs,
    temp,
  };

  return data;
};

const useWeather = (lat: number, lon: number) => {
  return useQuery(['weather', lat, lon], () => getWeather(lat, lon));
};

export default useWeather;
