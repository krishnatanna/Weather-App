const { useState, useEffect } = React;

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock weather data for demonstration
  const mockWeatherData = {
    london: {
      name: 'London',
      country: 'GB',
      temp: 18,
      feels_like: 16,
      humidity: 65,
      visibility: 10,
      wind_speed: 12,
      description: 'Partly cloudy',
      condition: 'clouds'
    },
    paris: {
      name: 'Paris',
      country: 'FR',
      temp: 22,
      feels_like: 24,
      humidity: 58,
      visibility: 15,
      wind_speed: 8,
      description: 'Sunny',
      condition: 'clear'
    },
    tokyo: {
      name: 'Tokyo',
      country: 'JP',
      temp: 28,
      feels_like: 32,
      humidity: 78,
      visibility: 8,
      wind_speed: 6,
      description: 'Light rain',
      condition: 'rain'
    },
    'new york': {
      name: 'New York',
      country: 'US',
      temp: 25,
      feels_like: 27,
      humidity: 72,
      visibility: 12,
      wind_speed: 15,
      description: 'Thunderstorm',
      condition: 'thunderstorm'
    },
    sydney: {
      name: 'Sydney',
      country: 'AU',
      temp: 20,
      feels_like: 19,
      humidity: 55,
      visibility: 20,
      wind_speed: 18,
      description: 'Clear sky',
      condition: 'clear'
    },
    mumbai: {
      name: 'Mumbai',
      country: 'IN',
      temp: 32,
      feels_like: 36,
      humidity: 85,
      visibility: 6,
      wind_speed: 10,
      description: 'Humid and cloudy',
      condition: 'clouds'
    },
    delhi: {
      name: 'Delhi',
      country: 'IN',
      temp: 35,
      feels_like: 38,
      humidity: 45,
      visibility: 8,
      wind_speed: 5,
      description: 'Hot and sunny',
      condition: 'clear'
    },
    ahmedabad: {
      name: 'Ahmedabad',
      country: 'IN',
      temp: 38,
      feels_like: 42,
      humidity: 40,
      visibility: 12,
      wind_speed: 8,
      description: 'Very hot and clear',
      condition: 'clear'
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear':
        return 'fas fa-sun';
      case 'clouds':
        return 'fas fa-cloud';
      case 'rain':
        return 'fas fa-cloud-rain';
      case 'snow':
        return 'fas fa-snowflake';
      case 'thunderstorm':
        return 'fas fa-bolt';
      default:
        return 'fas fa-sun';
    }
  };

  const getBackgroundClass = (condition) => {
    switch (condition) {
      case 'clear':
        return 'bg-clear';
      case 'clouds':
        return 'bg-clouds';
      case 'rain':
        return 'bg-rain';
      case 'snow':
        return 'bg-snow';
      case 'thunderstorm':
        return 'bg-thunderstorm';
      default:
        return 'bg-default';
    }
  };

  const getIconColorClass = (condition) => {
    switch (condition) {
      case 'clear':
        return 'sun';
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'rain';
      case 'snow':
        return 'snow';
      case 'thunderstorm':
        return 'thunderstorm';
      default:
        return 'sun';
    }
  };

  const searchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const searchKey = city.toLowerCase().trim();
      const weatherData = mockWeatherData[searchKey];

      if (weatherData) {
        setWeather(weatherData);
        setError('');
      } else {
        setError('City not found. Try: London, Paris, Tokyo, New York, Sydney, Mumbai, Delhi, or Ahmedabad');
        setWeather(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const backgroundClass = weather ? getBackgroundClass(weather.condition) : 'bg-default';

  return React.createElement('div', {
    className: `weather-app ${backgroundClass}`
  }, 
    React.createElement('div', {
      className: 'glass-container'
    },
      React.createElement('div', {
        className: 'main-container'
      },
        // Header
        React.createElement('div', {
          className: 'header'
        },
          React.createElement('h1', {
            className: 'app-title'
          }, 'Weather App'),
          React.createElement('p', {
            className: 'date-display'
          }, formatDate(currentTime)),
          React.createElement('p', {
            className: 'time-display'
          }, formatTime(currentTime))
        ),

        // Search
        React.createElement('div', {
          className: 'search-container'
        },
          React.createElement('input', {
            type: 'text',
            value: city,
            onChange: (e) => setCity(e.target.value),
            onKeyPress: handleKeyPress,
            placeholder: 'Enter city name...',
            className: 'search-input'
          }),
          React.createElement('button', {
            onClick: searchWeather,
            disabled: loading,
            className: 'search-button'
          },
            React.createElement('i', {
              className: 'fas fa-search'
            })
          )
        ),

        // Error Message
        error && React.createElement('div', {
          className: 'error-message'
        },
          React.createElement('p', null, error)
        ),

        // Loading
        loading && React.createElement('div', {
          className: 'loading-container'
        },
          React.createElement('div', {
            className: 'spinner'
          }),
          React.createElement('p', {
            className: 'loading-text'
          }, 'Loading weather data...')
        ),

        // Weather Display
        weather && !loading && React.createElement('div', {
          className: 'weather-card'
        },
          // Location
          React.createElement('div', {
            className: 'location-display'
          },
            React.createElement('i', {
              className: 'fas fa-map-marker-alt location-icon'
            }),
            React.createElement('span', {
              className: 'location-text'
            }, `${weather.name}, ${weather.country}`)
          ),

          // Main Weather
          React.createElement('div', {
            className: 'main-weather'
          },
            React.createElement('i', {
              className: `weather-icon ${getWeatherIcon(weather.condition)} ${getIconColorClass(weather.condition)}`
            }),
            React.createElement('div', {
              className: 'temperature'
            }, `${weather.temp}°C`),
            React.createElement('div', {
              className: 'description'
            }, weather.description),
            React.createElement('div', {
              className: 'feels-like'
            }, `Feels like ${weather.feels_like}°C`)
          ),

          // Weather Details
          React.createElement('div', {
            className: 'weather-details'
          },
            React.createElement('div', {
              className: 'detail-card'
            },
              React.createElement('i', {
                className: 'fas fa-tint detail-icon'
              }),
              React.createElement('div', {
                className: 'detail-label'
              }, 'Humidity'),
              React.createElement('div', {
                className: 'detail-value'
              }, `${weather.humidity}%`)
            ),
            React.createElement('div', {
              className: 'detail-card'
            },
              React.createElement('i', {
                className: 'fas fa-wind detail-icon'
              }),
              React.createElement('div', {
                className: 'detail-label'
              }, 'Wind'),
              React.createElement('div', {
                className: 'detail-value'
              }, `${weather.wind_speed} km/h`)
            ),
            React.createElement('div', {
              className: 'detail-card'
            },
              React.createElement('i', {
                className: 'fas fa-eye detail-icon'
              }),
              React.createElement('div', {
                className: 'detail-label'
              }, 'Visibility'),
              React.createElement('div', {
                className: 'detail-value'
              }, `${weather.visibility} km`)
            )
          ),

          // Quick Search Suggestions
          React.createElement('div', {
            className: 'suggestions-section'
          },
            React.createElement('p', {
              className: 'suggestions-title'
            }, 'Try searching:'),
            React.createElement('div', {
              className: 'suggestions-buttons'
            }, 
              Object.keys(mockWeatherData).map((cityName) => 
                React.createElement('button', {
                  key: cityName,
                  onClick: () => {
                    setCity(cityName);
                    setTimeout(() => searchWeather(), 100);
                  },
                  className: 'suggestion-button'
                }, cityName)
              )
            )
          )
        ),

        // Initial State
        !weather && !loading && !error && React.createElement('div', {
          className: 'initial-state'
        },
          React.createElement('div', {
            className: 'initial-card'
          },
            React.createElement('i', {
              className: 'fas fa-thermometer-half initial-icon'
            }),
            React.createElement('h2', {
              className: 'initial-title'
            }, 'Welcome to Weather App'),
            React.createElement('p', {
              className: 'initial-description'
            }, 'Search for any city to get current weather information'),
            React.createElement('p', {
              className: 'initial-hint'
            }, 'Try: London, Paris, Tokyo, New York, Sydney, Mumbai, Delhi, or Ahmedabad')
          )
        )
      ),

      // Footer
      React.createElement('div', {
        className: 'footer'
      },
      )
    )
  );
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeatherApp;
}