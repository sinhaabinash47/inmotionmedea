<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          variant="solo"
          hide-details
          single-line
          v-model="searchByCity"
          label="Search for a city"
          @input="debouncedSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="searchByCity || weather">
      <v-col cols="12" md="6">
        <v-card class="weather-card">
          <v-card-title v-if="weather">
            <v-chip color="white" variant="outlined">
              {{ weather.name }}
            </v-chip>
          </v-card-title>
          <v-card-text v-if="weather">
            <p class="text-center font-weight-bold" style="font-size: 30px">
              {{ weather.main.temp }}°C
            </p>
            <div
              class="d-flex justify-space-around align-start font-weight-bold"
              style="font-size: 18px; text-align: justify"
            >
              <p>Feels Like: {{ weather.main.feels_like }}°C</p>
              <p>Humidity: {{ weather.main.humidity }}%</p>
            </div>
            <div
              class="d-flex justify-space-around align-start font-weight-bold"
              style="font-size: 18px; text-align: justify"
            >
              <p>Conditions: {{ weather.weather[0].description }}</p>
              <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
            </div>
            <div
              class="d-flex justify-space-around align-start font-weight-bold"
              style="font-size: 18px; text-align: justify"
            >
              <p>Cloudiness: {{ weather.clouds.all }}%</p>
              <p>
                Min: {{ weather.main.temp_min }}°C
                <br />
                Max: {{ weather.main.temp_max }}°C
              </p>
            </div>
          </v-card-text>
          <v-card-text v-else>
            <p>Loading current location weather...</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";
import "../style.css";

export default {
  name: "Weather",
  data() {
    return {
      searchByCity: "",
      weather: null,
    };
  },
  created() {
    this.getCurrentLocationWeather();
    this.debouncedSearch = debounce(this.debouncedSearch, 400);
  },
  methods: {
    async getCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=45b07b34c2d26ac30ababeb1fcd77151`
              );
              this.weather = response.data;
            } catch (error) {
              console.error("Error fetching weather data:", error);
              this.weather = null;
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            this.weather = null;
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        this.weather = null;
      }
    },
    async handleWeather(city) {
      if (city.trim() === "") {
        this.getCurrentLocationWeather();
        return;
      }
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=45b07b34c2d26ac30ababeb1fcd77151`
        );
        this.weather = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weather = null;
      }
    },
    debouncedSearch() {
      this.handleWeather(this.searchByCity);
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 5rem;
}

.weather-card {
  background: rgba(0, 0, 0, 0.2);
  color: white;
}
</style>
