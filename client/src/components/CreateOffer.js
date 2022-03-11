import Form from "@rjsf/core"
import { Link } from "react-router-dom"
import React from "react"
import { Form as BootStrapForm, Container, Card, Button, Alert, Table } from "react-bootstrap"

//const Form = JSONSchemaForm.default;

const schema = {
    definitions: {},
    properties: {
      frequency: {
        enum: [
          'Weekly',
          'Monthly',
          'Annual'
        ],
        title: 'Time period to display offer letter',
        type: 'string'
      },
      create_date: {
        format: 'date',
        title: 'Offer letter create date',
        type: 'string'
      },
      name: {
        title: 'Candidate name in offer letter',
        type: 'string'
      },
      title: {
        title: 'Job title in offer letter',
        type: 'string'
      },
      details: {
        title: 'Offer details for internal notes',
        type: 'string'
      },
      non_monetary_benefits: {
        title: 'Non monetary benefits in offer letter, if any',
        type: 'string'
      },
      fixed_salary: {
        title: 'Salary',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Is this a fixed salary?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Salary: {
                    title: 'Salary',
                    type: 'number'
                  }
                },
                required: []
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ],
        description: 'Please choose one of hourly wage or salary (not both)'
      },
      hourly_wage: {
        title: 'Hourly Wage',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Is this an hourly wage?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Rate: {
                    title: 'Rate',
                    type: 'number'
                  },
                  OT_Mult: {
                    title: 'Overtime Multiplier',
                    type: 'number',
                    description: 'Multiplier of rate for OT, defaults to 1.5',
                    default: 1.5
                  },
                  OT_Hours: {
                    title: 'Hours required for Overtime',
                    type: 'integer',
                    default: 40,
                    description: 'Hours above which Overtime rate is applied. Defaults to 40'
                  },
                  Min_Hours: {
                    title: 'Minimum weekly working hours',
                    type: 'integer',
                    description: 'Minimum hours per week to display in the offer letter. Defaults to 0'
                  },
                  Max_Hours: {
                    title: 'Maximum weekly working hours',
                    type: 'integer',
                    default: 60,
                    description: 'Maximum hours per week to display in the offer letter. Defaults to 60'
                  },
                  Expected_Weekly_Hours: {
                    title: 'Expected Weekly Hours',
                    type: 'integer',
                    default: 40
                  }
                },
                required: [
                  'Rate',
                  'OT_Mult'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ],
        description: ''
      },
      recurring_bonus: {
        title: 'Recurring Bonus',
        type: 'object',
        description: '',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Is a recurring bonus given?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Bonus: {
                    title: 'Bonus amount',
                    type: 'number'
                  },
                  Description: {
                    title: 'Description of the recurring bonus',
                    type: 'string'
                  }
                },
                required: [
                  'Bonus'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      },
      onetime_bonus: {
        title: 'One Time Bonus',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Is a one time bonus given?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Bonus: {
                    title: 'Bonus amount',
                    type: 'number'
                  },
                  Description: {
                    title: 'Description',
                    type: 'string'
                  }
                },
                required: [
                  'Bonus'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      },
      discounts: {
        title: 'Discounts',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Are any discounts given?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Discount_Percentage: {
                    title: 'Discount Percentage',
                    type: 'number',
                    description: 'Please enter percent as a decimal. For example, 15% becomes 0.15',
                    default: null
                  },
                  Description: {
                    title: 'Description',
                    type: 'string'
                  },
                  Min_Spend: {
                    title: 'Minimum spend per period',
                    type: 'number',
                    description: 'Minimum spend per period to display on offer letter. Defaults to 0',
                    default: 0
                  },
                  Expected_Spend: {
                    title: 'Expected spend per period',
                    type: 'number',
                    description: 'Expected spend per period to display on offer letter.'
                  },
                  Max_Spend: {
                    title: 'Maximum spend per period',
                    type: 'number'
                  }
                },
                required: [
                  'Discount_Percentage',
                  'Expected_Spend',
                  'Max_Spend'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      },
      perks: {
        title: 'Perks',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Are there any perks that have a monetary value?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Amount: {
                    title: 'Monetary value of perks',
                    type: 'number'
                  },
                  Description: {
                    title: 'Description',
                    type: 'string'
                  }
                },
                required: [
                  'Amount'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      },
      tips: {
        title: 'Tips',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Are tips offered?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Expected_Amount: {
                    title: 'Expected amount of tips per period',
                    type: 'number'
                  },
                  Description: {
                    title: 'Description',
                    type: 'string'
                  }
                },
                required: [
                  'Expected_Amount'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      },
      other: {
        title: 'Other benefits',
        type: 'object',
        properties: {
          Included: {
            enum: [
              'Yes',
              'No'
            ],
            title: 'Are there other benefits that have a monetary value?',
            type: 'string'
          }
        },
        dependencies: {
          Included: {
            oneOf: [
              {
                properties: {
                  Included: {
                    enum: [
                      'Yes'
                    ]
                  },
                  Expected_Amount: {
                    title: 'Expected value per period',
                    type: 'number'
                  },
                  Description: {
                    title: 'Description',
                    type: 'string'
                  }
                },
                required: [
                  'Expected_Amount'
                ]
              },
              {
                properties: {
                  Included: {
                    enum: [
                      'No'
                    ]
                  }
                },
                required: []
              }
            ]
          }
        },
        required: [
          'Included'
        ]
      }
    },
    dependencies: {},
    required: [
      'frequency',
      'create_date',
      'name',
      'title',
      'fixed_salary',
      'hourly_wage',
      'recurring_bonus',
      'onetime_bonus',
      'discounts',
      'perks',
      'tips',
      'other'
    ],
    type: 'object',
    title: 'General Offer Details'
  }

const uiSchema = {
    frequency: {
      'ui:widget': 'radio'
    },
    fixed_salary: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Salary'
      ]
    },
    hourly_wage: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Rate',
        'OT_Mult',
        'OT_Hours',
        'Min_Hours',
        'Max_Hours',
        'Expected_Weekly_Hours'
      ]
    },
    recurring_bonus: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Bonus',
        'Description'
      ]
    },
    onetime_bonus: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Bonus',
        'Description'
      ]
    },
    discounts: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Discount_Percentage',
        'Description',
        'Min_Spend',
        'Expected_Spend',
        'Max_Spend'
      ]
    },
    perks: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Amount',
        'Description'
      ]
    },
    tips: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Expected_Amount',
        'Description'
      ]
    },
    other: {
      Included: {
        'ui:widget': 'radio'
      },
      'ui:order': [
        'Included',
        'Expected_Amount',
        'Description'
      ]
    },
    'ui:order': [
      'frequency',
      'create_date',
      'name',
      'title',
      'details',
      'non_monetary_benefits',
      'fixed_salary',
      'hourly_wage',
      'recurring_bonus',
      'onetime_bonus',
      'discounts',
      'perks',
      'tips',
      'other'
    ],
    definitions: {}
  }


export default function CreateOffer(props) {
    
    const handleSubmit = ({formData}) => {
        try {
            console.log(formData)
            // const response = await axios({
            //   method: "post",
            //   url: "/api/login",
            //   data: loginFormData,
            //   headers: { "Content-Type": "multipart/form-data" },
            // });
            } 
        catch(error) {
            console.log(error)
            }
    }


    return (
        <Container className="mt-4 mb-4"> 
            <Card style={{maxWidth:"800px", margin:"0 auto"}}>
                <Card.Body>
                    <Form 
                    schema={schema}
                    uiSchema={uiSchema} 
                    onSubmit={handleSubmit}
                    />
                </Card.Body>
            </Card>  
        </ Container>
    )
  }
