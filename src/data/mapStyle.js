const waterDark = {
    'styleJson': [
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#031628'
          }
        },
        {
          'featureType': 'land',
          'elementType': 'geometry',
          'stylers': {
            'color': '#000102'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#0b3d51'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'geometry',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#08304b'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'geometry',
          'stylers': {
            'lightness': -70
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#857f7f'
          }
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry',
          'stylers': {
            'color': '#022338'
          }
        },
        {
          'featureType': 'green',
          'elementType': 'geometry',
          'stylers': {
            'color': '#062032'
          }
        },
        {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#465b6c'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'all',
          'stylers': {
            'color': '#022338'
          }
        },
        {
          'featureType': 'label',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }
    ]
};
const waterLight = {
    styleJson: [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
            'color': '#f3f3f3'
        }
    }, {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
            'color': '#fdfdfd'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'local',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'label',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#999999'
        }
    }]
};
export default {
    waterDark,
    waterLight,
    normal: {style:'normal'},
    googlelite: {style:'googlelite'}
}