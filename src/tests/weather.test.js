// src/tests/weather.node.test.js
import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherService.js";

test("fetchCurrentWeather returns weather for Nairobi", async () => {
  const data = await fetchCurrentWeather("nairobi");
  assert.equal(data.city.toLowerCase(), "nairobi");
  assert.ok(typeof data.temperature === "number");
  assert.ok(typeof data.weather === "string");
});

test("fetchForecast returns 5-day forecast array", async () => {
  const forecast = await fetchForecast("nairobi");
  assert.ok(Array.isArray(forecast));
  assert.equal(forecast.length, 5);
  assert.ok(forecast[0].min !== undefined && forecast[0].max !== undefined);
});

test("fetchCurrentWeather throws for invalid city", async () => {
  let threw = false;
  try {
    await fetchCurrentWeather("invalidcity123");
  } catch (err) {
    threw = true;
    assert.equal(err.status, 500);
  }
  assert.ok(threw);
});
