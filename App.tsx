import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ShadowPropTypesIOS,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
} from 'react-native-health';
import firestore from '@react-native-firebase/firestore';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      // //Characteristics(done)
      AppleHealthKit.Constants.Permissions.HeartRate, //getHeartRateSamples
      AppleHealthKit.Constants.Permissions.Steps, 
      AppleHealthKit.Constants.Permissions.Height, //getLatestHeight
      AppleHealthKit.Constants.Permissions.Weight,  //getLatestWeight
      AppleHealthKit.Constants.Permissions.BiologicalSex, //getBiologicalSex
      AppleHealthKit.Constants.Permissions.BloodType,  //getBloodType
      AppleHealthKit.Constants.Permissions.WaistCircumference, //getLatestWaistCircumference
      AppleHealthKit.Constants.Permissions.DateOfBirth,
      // Body Measurements (done)
      AppleHealthKit.Constants.Permissions.BodyMass, //can we delete this for weight instead of this
      AppleHealthKit.Constants.Permissions.BodyFatPercentage, //getLatestBodyFatPercentage
      AppleHealthKit.Constants.Permissions.BodyMassIndex, //(zafe said to scrap this)
      AppleHealthKit.Constants.Permissions.LeanBodyMass, //getLatestLeanBodyMass
      // Hearing (done)
      AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposure, //getEnvironmentalAudioExposure
      AppleHealthKit.Constants.Permissions.HeadphoneAudioExposure,  //getHeadphoneAudioExposure
      AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposureEvent, //getEnvironmentalAudioExposureEvent invoke addition
      AppleHealthKit.Constants.Permissions.HeadphoneAudioExposureEvent, //invoke addition

      //Fitness (done)
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning, //getDistanceWalkingRunning
      AppleHealthKit.Constants.Permissions.DistanceSwimming, //(scrap for now and ask zafe)
      AppleHealthKit.Constants.Permissions.DistanceCycling,  //getDistanceCycling
      AppleHealthKit.Constants.Permissions.FlightsClimbed, //getFlightsClimbed
      AppleHealthKit.Constants.Permissions.NikeFuel, //should we even use this(ask zafe)
     
      //Activity (done)
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned, //getActiveEnergyBurned
      AppleHealthKit.Constants.Permissions.BasalEnergyBurned, //getBasalEnergyBurned
      AppleHealthKit.Constants.Permissions.AppleExerciseTime, //getAppleExerciseTime
      AppleHealthKit.Constants.Permissions.AppleStandTime, //getAppleStandTime
      
      //Vitals
      AppleHealthKit.Constants.Permissions.HeartRate, //(should we use this or heatbeat samples or heart rate variability instead)
      AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage, //etWalkingHeartRateAverage
      AppleHealthKit.Constants.Permissions.RestingHeartRate, //getRestingHeartRateSamples
      AppleHealthKit.Constants.Permissions.HeartRateVariability, //getHeartRateVariabilitySamples
      AppleHealthKit.Constants.Permissions.HeartbeatSeries, //(ask zafe before doing this)
      AppleHealthKit.Constants.Permissions.Vo2Max, //getVo2MaxSamples
      AppleHealthKit.Constants.Permissions.BodyTemperature, //(ask zafe about user input data)
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic, //gonna scrap because we need to snag correlated
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic, //correlate both
      AppleHealthKit.Constants.Permissions.RespiratoryRate, //getRespiratoryRateSamples
      AppleHealthKit.Constants.Permissions.OxygenSaturation, //getOxygenSaturationSamples
      AppleHealthKit.Constants.Permissions.Electrocardiogram, //getElectrocardiogramSamples
      // sleep & Mindfulness
      AppleHealthKit.Constants.Permissions.SleepAnalysis, //getSleepSamples
      AppleHealthKit.Constants.Permissions.MindfulSession, //getMindfulSession
      // workouts
      AppleHealthKit.Constants.Permissions.Workout, //saveWorkout

      // Lab and test results
      AppleHealthKit.Constants.Permissions.BloodAlcoholContent, //getBloodAlcoholContentSamples

      //Reproductive Health (Consult Zafe)
      //Symptoms Identifiers (consult Zafe)

      //New Invoke stuff---------
      //vitals
      //vitals.h
      //vitals.m(doublecheck again)

      //hearing
      

      //lab tests
      AppleHealthKit.Constants.Permissions.NumberOfTimesFallen,

      //mobility/vitals
      AppleHealthKit.Constants.Permissions.LowCardioFitnessEvent, //.t
      AppleHealthKit.Constants.Permissions.LowHeartRateEvent, //.t
      AppleHealthKit.Constants.Permissions.HighHeartRateEvent, //.t
      AppleHealthKit.Constants.Permissions.IrregularHeartRateEvent, //.t
      AppleHealthKit.Constants.Permissions.AppleWalkingSteadiness, //(Working)
      AppleHealthKit.Constants.Permissions.AppleWalkingSteadinessEvent, //.t
      AppleHealthKit.Constants.Permissions.SixMinuteWalkTestDistance, //.t
      AppleHealthKit.Constants.Permissions.WalkingSpeed, //.t
      AppleHealthKit.Constants.Permissions.WalkingStepLength, //.t
      AppleHealthKit.Constants.Permissions.WalkingAsymmetryPercentage, //.t
      AppleHealthKit.Constants.Permissions.WalkingDoubleSupportPercentage, //.t
      AppleHealthKit.Constants.Permissions.StairAscentSpeed, //.t
      AppleHealthKit.Constants.Permissions.StairDescentSpeed, //.t
      //---------
    ],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }

  /* Can now read or write to HealthKit */

  let options = {
    startDate: new Date(2020, 1, 1).toISOString(), //change to todays date minus 7 days
     };

//-----------Data Retrieval--------------// ask Owusu how we can condense this to 1 function for cleanliness


//Body Methods 1
AppleHealthKit.getLatestWeight( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
  );
AppleHealthKit.getWeightSamples( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getLatestHeight( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getLatestWaistCircumference( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);

//Characteristic 1
  AppleHealthKit.getBiologicalSex( //add in all of the functions to be able to get this data
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
  AppleHealthKit.getDateOfBirth( //add in all of the functions to be able to get this data
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
 

//Fitness 1
AppleHealthKit.getDailyStepSamples ( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getDailyDistanceWalkingRunningSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getDailyFlightsClimbedSamples( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
//Activity 1
AppleHealthKit.getActiveEnergyBurned( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getBasalEnergyBurned( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getAppleExerciseTime( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getAppleStandTime( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getActivitySummary( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
//Hearing 1
AppleHealthKit.getEnvironmentalAudioExposure( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getEnvironmentalAudioExposureEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getHeadphoneAudioExposure( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getHeadphoneAudioExposureEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);

//Lab Tests 1
AppleHealthKit.getNumberOfTimesFallen( //invoke addition
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);

//Sleep 1
AppleHealthKit.getSleepSamples( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);


//Vitals 1
AppleHealthKit.getHeartRateSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getRestingHeartRate( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getRestingHeartRateSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getWalkingHeartRateAverage( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getRespiratoryRateSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getHeartRateVariabilitySamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getHeartbeatSeriesSamples( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getVo2MaxSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getOxygenSaturationSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getElectrocardiogramSamples( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getBodyTemperatureSamples( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
// AppleHealthKit.getBloodPressureSamples( //add in all of the functions to be able to get this data
//   options,
//   (callbackError: string, results: HealthValue[]) => {
//     /* Samples are now collected from HealthKit */
//   },
// );
AppleHealthKit.getLowCardioFitnessEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getLowHeartRateEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getHighHeartRateEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getIrregularHeartRateEvent( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);



//Mobility 1
AppleHealthKit.getAppleWalkingSteadiness( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getAppleWalkingSteadinessEvent( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getSixMinuteWalkTestDistance( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getWalkingSpeed( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getWalkingStepLength( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getWalkingAsymmetryPercentage( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getWalkingDoubleSupportPercentage( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);
AppleHealthKit.getStairAscentSpeed( //add in all of the functions to be able to get this data
  options,
  (callbackError: string, results: HealthValue[]) => {
    /* Samples are now collected from HealthKit */
  },
);
AppleHealthKit.getStairDescentSpeed( //add in all of the functions to be able to get this data
  options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
);

//Workout
// leave for zafe to create

//reproductive data

});

export default function App() {
  const [authStatus, setAuthStatus] = useState<any>({});
  //data array
  //Body Measurements -1
  const [LatestWeight, getLatestWeight] = useState({});//1
  const [WeightSample, getWeightSample] = useState({});//1
  const [LatestHeight, getLatestHeight] = useState({}); //1
  const [LatestWaistCircumference, getLatestWaistCircumference] = useState({}); //1
  
  //Characteristics -1
  const [BiologicalSex, getBiologicalSex] = useState({});//1
  const [DateOfBirth, getDateOfBirth] = useState({});//1
  
  //Fitness -1
  const [DailyStepSamples, getDailyStepSamples] = useState({});//1
  const [DistanceWalkingRunning, getDistanceWalkingRunning] = useState({});//1
  const [DailyFlightsClimbed, getDailyFlightsClimbed] = useState({});//1
  
  //Activity -1
  const [ActiveEnergyBurned, getActiveEnergyBurned] = useState({});
  const [BasalEnergyBurned, getBasalEnergyBurned] = useState({});
  const [AppleExerciseTime, getAppleExerciseTime] = useState({});
  const [AppleStandTime, getAppleStandTime] = useState({});
  const [ActivitySummary, getActivitySummary] = useState({});
  

  //Hearing -1
  const [EnvironmentalAudioExposure, getEnvironmentalAudioExposure] = useState({});
  const [EnvironmentalAudioExposureEvent, getEnvironmentalAudioExposureEvent] = useState({});
  const [HeadphoneAudioExposure, getHeadphoneAudioExposure] = useState({});
  const [HeadphoneAudioExposureEvent, getHeadphoneAudioExposureEvent] = useState({});
  
  //Lab and test results -1
 const [NumberOfTimesFallen, getNumberOfTimesFallen] = useState({});
  
 //sleep
 const [SleepSamples, getSleepSamples] = useState({});
  
  //Vitals -1
  const [HeartRateSamples, getHeartRateSamples] = useState({});
  const [RestingHeartRate, getRestingHeartRate] = useState({});
  const [RestingHeartRateSamples, getRestingHeartRateSamples] = useState({});
  const [WalkingHeartRateAverage, getWalkingHeartRateAverage] = useState({});
  const [RespiratoryRate, getRespiratoryRate] = useState({});
  const [HeartRateVariability, getHeartRateVariability] = useState({});
  const [HeartbeatSeries, getHeartbeatSeries] = useState({});
  const [Vo2Max, getVo2Max] = useState({});
  const [OxygenSaturation, getOxygenSaturation] = useState({});
  const [Electrocardiogram, getElectrocardiogram] = useState({});
  const [BodyTemperature, getBodyTemperature] = useState({});
  const [BloodPressureCorrelated, getBloodPressureCorrelated] = useState({});
  const [LowCardioFitnessEvent, getLowCardioFitnessEvent] = useState({});
  const [LowHeartRateEvent, getLowHeartRateEvent] = useState({});
  const [HighHeartRateEvent, getHighHeartRateEvent] = useState({});
  const [IrregularHeartRateEvent, getIrregularHeartRateEvent] = useState({});

  //Mobility-Vitals -1
 const [AppleWalkingSteadiness, getAppleWalkingSteadiness] = useState({});
 const [AppleWalkingSteadinessEvent, getAppleWalkingSteadinessEvent] = useState({});
 const [SixMinuteWalkTestDistance, getSixMinuteWalkTestDistance] = useState({});
 const [WalkingSpeed, getWalkingSpeed] = useState({});
 const [WalkingStepLength, getWalkingStepLength] = useState({});
 const [WalkingAsymmetryPercentage, getWalkingAsymmetryPercentage] = useState({});
 const [WalkingDoubleSupportPercentage, getWalkingDoubleSupportPercentage] = useState({});
 const [StairAscentSpeed, getStairAscentSpeed] = useState({});
 const [StairDescentSpeed, getStairDescentSpeed] = useState({});
 
 
  
  //Workouts
  
  
  //Reproductive Health

  //Symptoms
  
  //--------
  const handlePressGetAuthStatus = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  let options = {
    startDate: new Date(2020, 1, 1).toISOString(), //change to todays date minus 7 days
   
    };

  const handleGetData = () => {  
//-----------Data Retrieval--------------// ask Owusu how we can condense this to 1 function for cleanliness


//Body Methods 1
AppleHealthKit.getLatestWeight( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getLatestWeight(results);
    console.log(results)
  },
);
AppleHealthKit.getWeightSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWeightSample(results);
    console.log(results)
  },
);
AppleHealthKit.getLatestHeight( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getLatestHeight(results);
    console.log(results)
  },
);
AppleHealthKit.getLatestWaistCircumference( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getLatestWaistCircumference(results);
    console.log(results)
  },
);

//Characteristic 1
  AppleHealthKit.getBiologicalSex( //add in all of the functions to be able to get this data
    (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getBiologicalSex(results);
    console.log(results)
  },
);
  AppleHealthKit.getDateOfBirth( //add in all of the functions to be able to get this data
    (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getDateOfBirth(results);
    console.log(results)
  },
);
 

//Fitness 1
AppleHealthKit.getDailyStepSamples( //add in all of the functions to be able to get this data
    (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getDailyStepSamples(results);
    console.log(results)
  },
);
AppleHealthKit.getDailyDistanceWalkingRunningSamples( //add in all of the functions to be able to get this data
    (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getDistanceWalkingRunning(results);
    console.log(results)
  },
);
AppleHealthKit.getDailyFlightsClimbedSamples( //add in all of the functions to be able to get this data
    (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getDailyFlightsClimbed(results);
    console.log(results)
  },
);

//Activity 1
AppleHealthKit.getActiveEnergyBurned( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getActiveEnergyBurned(results);
    console.log(results)
  },
);
AppleHealthKit.getBasalEnergyBurned( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getBasalEnergyBurned(results);
    console.log(results)
  },
);
AppleHealthKit.getAppleExerciseTime( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getAppleExerciseTime(results);
    console.log(results)
  },
);
AppleHealthKit.getAppleStandTime( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getAppleStandTime(results);
    console.log(results)
  },
);
AppleHealthKit.getActivitySummary( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getActivitySummary(results);
    console.log(results)
  },
);
//Hearing 1
AppleHealthKit.getEnvironmentalAudioExposure( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getEnvironmentalAudioExposure(results);
    console.log(results)
  },
);
AppleHealthKit.getEnvironmentalAudioExposureEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getEnvironmentalAudioExposureEvent(results);
    console.log(results)
  },
);
AppleHealthKit.getHeadphoneAudioExposure( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHeadphoneAudioExposure(results);
    console.log(results)
  },
);
AppleHealthKit.getHeadphoneAudioExposureEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHeadphoneAudioExposureEvent(results);
    console.log(results)
  },
);

//Lab Tests 1
AppleHealthKit.getNumberOfTimesFallen( //invoke addition
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getNumberOfTimesFallen(results);
    console.log(results)
  },
);

//Sleep 1
AppleHealthKit.getSleepSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getSleepSamples(results);
    console.log(results)
  },
);


//Vitals 1
AppleHealthKit.getHeartRateSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHeartRateSamples(results);
    console.log(results)
  },
);
AppleHealthKit.getRestingHeartRate( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getRestingHeartRate(results);
    console.log(results)
  },
);
AppleHealthKit.getRestingHeartRateSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getRestingHeartRateSamples(results);
    console.log(results)
  },
);
AppleHealthKit.getWalkingHeartRateAverage( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWalkingHeartRateAverage(results);
    console.log(results)
  },
);
AppleHealthKit.getRespiratoryRateSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getRespiratoryRate(results);
    console.log(results)
  },
);
AppleHealthKit.getHeartRateVariabilitySamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHeartRateVariability(results);
    console.log(results)
  },
);
AppleHealthKit.getHeartbeatSeriesSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHeartbeatSeries(results);
    console.log(results)
  },
);
AppleHealthKit.getVo2MaxSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getVo2Max(results);
    console.log(results)
  },
);
AppleHealthKit.getOxygenSaturationSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getOxygenSaturation(results);
    console.log(results)
  },
);
AppleHealthKit.getElectrocardiogramSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getElectrocardiogram(results);
    console.log(results)
  },
);
AppleHealthKit.getBodyTemperatureSamples( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getBodyTemperature(results);
    console.log(results)
  },
);
// AppleHealthKit.getBloodPressureSamples( //add in all of the functions to be able to get this data
//   (options),
//   (err: Object, results: HealthValue) => {
//     if (err) {
//       return
//     }
//     getBloodPressureCorrelated(results);
//     console.log(results)
//   },
// );
AppleHealthKit.getLowCardioFitnessEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getLowCardioFitnessEvent(results);
    console.log(results)
  },
);
AppleHealthKit.getLowHeartRateEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getLowHeartRateEvent(results);
    console.log(results)
  },
);
AppleHealthKit.getHighHeartRateEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getHighHeartRateEvent(results);
    console.log(results)
  },
);
AppleHealthKit.getIrregularHeartRateEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getIrregularHeartRateEvent(results);
    console.log(results)
  },
);



//Mobility 1
AppleHealthKit.getAppleWalkingSteadiness( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getAppleWalkingSteadiness(results);
    console.log(results)
  },
);
AppleHealthKit.getAppleWalkingSteadinessEvent( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getAppleWalkingSteadinessEvent(results);
    console.log(results)
  },
);
AppleHealthKit.getSixMinuteWalkTestDistance( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getSixMinuteWalkTestDistance(results);
    console.log(results)
  },
);
AppleHealthKit.getWalkingSpeed( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWalkingSpeed(results);
    console.log(results)
  },
);
AppleHealthKit.getWalkingStepLength( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWalkingStepLength(results);
    console.log(results)
  },
);
AppleHealthKit.getWalkingAsymmetryPercentage( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWalkingAsymmetryPercentage(results);
    console.log(results)
  },
);
AppleHealthKit.getWalkingDoubleSupportPercentage( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getWalkingDoubleSupportPercentage(results);
    console.log(results)
  },
);
AppleHealthKit.getStairAscentSpeed( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getStairAscentSpeed(results);
    console.log(results)
  },
);
AppleHealthKit.getStairDescentSpeed( //add in all of the functions to be able to get this data
  (options),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    getStairDescentSpeed(results);
    console.log(results)
  },
);

//Workout
// leave for zafe to create

//reproductive data



  }

  const sendToFirebase = () => {
    
    //Body Methods
    firestore().collection('Playground').add({value:LatestWeight.value})
    firestore().collection('Playground').add({value:WeightSample.value})
    firestore().collection('Playground').add({value:LatestHeight.value})
    firestore().collection('Playground').add({value:LatestWaistCircumference.value})
    

    //Characteristic
    firestore().collection('Playground').add({value:BiologicalSex.value})
    firestore().collection('Playground').add({value:DateOfBirth.value})
    
    //Fitness
    firestore().collection('Playground').add({value:DailyStepSamples.value})
    firestore().collection('Playground').add({value:DistanceWalkingRunning.value})
    firestore().collection('Playground').add({value:DailyFlightsClimbed.value})
    
    //Fitness
    firestore().collection('Playground').add({value:ActiveEnergyBurned.value})
    firestore().collection('Playground').add({value:BasalEnergyBurned.value})
    firestore().collection('Playground').add({value:AppleExerciseTime.value})
    firestore().collection('Playground').add({value:AppleStandTime.value})
    firestore().collection('Playground').add({value:ActivitySummary.value})
    
    //Hearing
    firestore().collection('Playground').add({value:EnvironmentalAudioExposure.value})
    firestore().collection('Playground').add({value:EnvironmentalAudioExposureEvent.value})
    firestore().collection('Playground').add({value:HeadphoneAudioExposure.value})
    firestore().collection('Playground').add({value:HeadphoneAudioExposureEvent.value})
    
    //Lab Tests
    firestore().collection('Playground').add({value:NumberOfTimesFallen.value})
    
    //Sleep
    firestore().collection('Playground').add({value:SleepSamples.value})
    
    //Vitals
    firestore().collection('Playground').add({value:HeartRateSamples.value})
    firestore().collection('Playground').add({value:RestingHeartRate.value})
    firestore().collection('Playground').add({value:RestingHeartRateSamples.value})
    firestore().collection('Playground').add({value:WalkingHeartRateAverage.value})
    firestore().collection('Playground').add({value:RespiratoryRate.value})
    firestore().collection('Playground').add({value:HeartRateVariability.value})
    firestore().collection('Playground').add({value:HeartbeatSeries.value})
    firestore().collection('Playground').add({value:Vo2Max.value})
    firestore().collection('Playground').add({value:OxygenSaturation.value})
    firestore().collection('Playground').add({value:Electrocardiogram.value})
    firestore().collection('Playground').add({value:BodyTemperature.value})
    //firestore().collection('Playground').add({value:BloodPressureSamples.value})
    firestore().collection('Playground').add({value:LowCardioFitnessEvent.value})
    firestore().collection('Playground').add({value:LowHeartRateEvent.value})
    firestore().collection('Playground').add({value:HighHeartRateEvent.value})
    firestore().collection('Playground').add({value:IrregularHeartRateEvent.value})

    //Mobility
    firestore().collection('Playground').add({value:AppleWalkingSteadiness.value})
    firestore().collection('Playground').add({value:AppleWalkingSteadinessEvent.value})
    firestore().collection('Playground').add({value:SixMinuteWalkTestDistance.value})
    firestore().collection('Playground').add({value:WalkingSpeed.value})
    firestore().collection('Playground').add({value:WalkingStepLength.value})
    firestore().collection('Playground').add({value:WalkingAsymmetryPercentage.value})
    firestore().collection('Playground').add({value:WalkingDoubleSupportPercentage.value})
    firestore().collection('Playground').add({value:StairAscentSpeed.value})
    firestore().collection('Playground').add({value:StairDescentSpeed.value})
    
    
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Invoke Data Tracking Thingy
              </Text>
              <Text onPress={handleGetData}>
                Press me to get health data
              </Text>
              <Text style={styles.sectionDescription}>
                {JSON.stringify(authStatus, null, 2)}
              </Text>

               
              <Text onPress={sendToFirebase}>
                Press me to send this data to Firebase (hopefully hehe)
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
}
);
