import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av'; 

const AsrScreen = () => {
  const [step, setStep] = useState(1);
  const [sound, setSound] = useState(null);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/shahada.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const prayer7 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer7.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer1 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer1.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer14 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer14.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer13 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer1.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }
  const prayer2 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer3.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer12 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer12.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }
  const prayer4 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer4.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer5 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer5.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }
  const prayer8 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer8.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer9 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer9.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  const prayer6 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer6.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }
  const prayer10 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer10.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }
  const prayer11 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/prayer11.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }



  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Step 1: Perform Wudu</Text>
            <ScrollView style={styles.scrollView}>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 1: Intention (Niyyah)</Text>
                <Text style={styles.description}>
                  Before starting Wudu, make a sincere intention in your heart to perform it purely for the sake of God
                </Text>
              </View>




              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 2: Bismillah (In the name of Allah)</Text>
                <Text style={styles.description}>
                  Start with saying "Bismillah" (In the name of Allah)
                </Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 3: Wash Hands</Text>
                <Text style={styles.description}>
                  (do Istinja
Islamic term for cleaning oneself with water after excretion)Wash your hands with soap and water.
                  Wash both hands up to the wrists three times
                </Text>
                <Image source={require('../../pic/washinhhands.png')} style={styles.image} />
              </View>


              
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 4: Rinse Mouth</Text>
                <Text style={styles.description}>
                  Take water into your mouth, swirl it around, and then expel it, repeating three times.
                </Text>
                <Image source={require('../../pic/mouth.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 5: Rinse Nose</Text>
                <Text style={styles.description}>
                Sniff water into your nose and blow it out, also repeating three times.
                </Text>
                <Image source={require('../../pic/nose.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 6:Wash Face</Text>
                <Text style={styles.description}>
                Wash your face from the hairline to the chin and from ear to ear, ensuring that the entire face is covered, three times.
                </Text>
                <Image source={require('../../pic/face.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 7:Wash Arms</Text>
                <Text style={styles.description}>
                Wash the right arm up to and including the elbow, followed by the left arm, three times each.
Ensure that water reaches all parts of the arms.
                </Text>
                <Image source={require('../../pic/arms.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 8:Wipe Head</Text>
                <Text style={styles.description}>
                Wipe the entire head with wet hands once, moving them from the front of the head to the back, and then bringing them back to the front.
                </Text>
                <Image source={require('../../pic/head.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 9:Wipe Ears</Text>
                <Text style={styles.description}>
                Use your index fingers to wipe the inside and outside of the ears with wet fingers once.
                </Text>
                <Image source={require('../../pic/ears.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 10:Wash Feet</Text>
                <Text style={styles.description}>
                Wash the right foot up to and including the ankle, followed by the left foot, three times each.
Ensure that water reaches all parts of the feet, including between the toes.
                </Text>
                <Image source={require('../../pic/feet.png')} style={styles.image} />
              </View>
              <View style={styles.stepContainer}>
                <Text style={styles.text}>Step 11:Recite Shahada (Declaration of Faith) (Optional)</Text>
                <Text style={styles.description}>
                ashhadu an la ilaha illallah wa ashhadu anna muhammadarrasulullah
                </Text>
                <Button title="Play Audio" onPress={playSound} />                 
              </View>
            </ScrollView>
            <Button title="Next" onPress={handleNextStep} />
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
          <Text style={styles.title}>Step 2: How to Pray/Salah First Rakat</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 1:  Late Afternoon Prayer (Salat al-Asr)</Text>
              <Text style={styles.description}>
              It is eight rakahs. First, four sunnah rakahs, and then four obligatory rakahs are performed.
              </Text>
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 2: Niyyah</Text>
              <Text style={styles.description}>
              Begin with the proper niyyah (intention) that you want to pray, this can be done in your mind or verbally. The purpose is so that you are not heedless in prayer but are aware of the kind of salat you are about to offer.

I intend to offer the _____ rakats of the ____ prayer. So you could say something along the lines, “I intend to offer the 4 rakats fardh of the Asr prayer” .Standing Straight.
              </Text>
              <Image source={require('../../pic/prayer1.png')} style={styles.image3} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 3: Starting Prayer</Text>
              <Text style={styles.description}>
              Now, with palms open, raise your hands to your ears and say the Takbir (Allahu Akbar) which means Allah is the greatest.
              </Text>
              <Image source={require('../../pic/prayer2.png')} style={styles.image3} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 4: Reciting the Prayer</Text>
              <Text style={styles.description}>
              After Takbir, place cross your hands at chest level grabbing your left wrist with your right hand. Begin with the recitation of thana.
              After this recite Surah Al-Fatiha which is the first chapter of the Quran( still Standing in the same position).</Text>
              <Image source={require('../../pic/prayer3.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer1} />   
              <Text style={styles.description}>Say Ameen at the end of the recitation
              </Text>  
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 5: Recite a passage from the Quran  </Text>
              <Text style={styles.description}>
              While praying the first two rakats, after saying ameen, recite any passage from the Qur’an. Surah Ikhlas is commonly taught first because it is one of the shorter surahs and for the great rewards associated with it.( Still Standing in the same position).
              </Text>
              <Button title="Play Audio" onPress={prayer2} />  
              <Text style={styles.description}>Go into ruku after Allahu Akbar</Text>   
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 6:Ruku</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, bend down for ruku. Ruku is the position where you keep your head and back aligned and put your hands on your knees. Here recite Tasbeeh three times or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer4.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer4} />  
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 7:back to standing</Text>
              <Text style={styles.description}>
              Next stand up from the bowing position saying,Sami’Allahu liman hamidah,Rabbana lakal hamd, you move while saying it.
              </Text>
              <Image source={require('../../pic/prayer1.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer5} /> 
              <Text style={styles.description}> Then a longer Allahu Akbar while going into sajdah </Text>
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 8: sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer6} /> 
              <Text style={styles.description}>After saying Allahu Akbar, sit up right</Text>
            </View>




            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 9: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.Say Allahu Akbar, and repeat sajdah.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 10:Completing One Rakat </Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer7} /> 
              <Text style={styles.description}>Ending with a longer Allahu Akbar, standing back up,contiue the prayer into second rakat</Text>
            </View>
          </ScrollView>
            
            <Button title="Previous" onPress={() => setStep(step - 1)} />
            <Button title="Next" onPress={handleNextStep} />
          </View>
        );
      case 3:
        return (
          <View style={styles.container}>
          <Text style={styles.title}>Step 3: How to Pray/Salah Second Rakat</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 1: Continue from last step</Text>
              <Text style={styles.description}>
              Continue from the last step.
              You should be back to this postion, however instead of reading the prayer from the beginning, you skip to reciting Surah Al-Fatiha which is the first chapter of the Quran
              </Text>
              <Image source={require('../../pic/prayer3.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer8} />
              <Text style={styles.description}>Say Ameen</Text>
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 2: Recite a passage from the Quran  </Text>
              <Text style={styles.description}>
              While praying the first two rakats, after saying ameen, recite any passage from the Qur’an. Surah Ikhlas is commonly taught first because it is one of the shorter surahs and for the great rewards associated with it.( Still Standing in the same position).
              </Text>
              <Button title="Play Audio" onPress={prayer2} />  
              <Text style={styles.description}>Go into ruku after Allahu Akbar</Text>   
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 3:Ruku</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, bend down for ruku. Ruku is the position where you keep your head and back aligned and put your hands on your knees. Here recite Tasbeeh three times or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer4.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer4} />  
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 4:back to standing</Text>
              <Text style={styles.description}>
              Next stand up from the bowing position saying,Sami’Allahu liman hamidah,Rabbana lakal hamd, you move while saying it.
              </Text>
              <Image source={require('../../pic/prayer1.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer5} /> 
              <Text style={styles.description}> Then a longer Allahu Akbar while going into sajdah </Text>
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 5: sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer6} /> 
              <Text style={styles.description}>After saying Allahu Akbar, sit up right</Text>
            </View>




            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 6: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.Say Allahu Akbar, and repeat sajdah.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 7: Back to sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer7} /> 
              <Text style={styles.description}>On the second rakat, you sit back up</Text>
            </View>
          


            
            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 8: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.You read the rest of the prayer sitting.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 9: Here we recite Tashahhud silently</Text>
              <Text style={styles.description}>
             While sitting you recite the rest of the prayer, until the shahada, then we stand back up for the third rakat.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
              <Button title="Play Audio" onPress={prayer9} />  
              <Text style={styles.description}> while reciting(testimony of faith – ashhadu alla ilaha illallah wa ashhadu anna muhammadan abduhu wa rasuluhu) ball up your right hand into a fist and raise your index finger.</Text>   
              <Image source={require('../../pic/prayer7.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer10} /> 
              <Text style={styles.description}>Followed by Allahu Akbar, back to standing position</Text>
            </View>
          </ScrollView>
            
            <Button title="Previous" onPress={() => setStep(step - 1)} />
            <Button title="Next" onPress={handleNextStep} />
          </View>
        );
      case 4:
        return (
          <View style={styles.container}>
          <Text style={styles.title}>Step 4: How to Pray/Salah Third Rakat</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 1: Continue from last step</Text>
              <Text style={styles.description}>
              Continue from the last step.
              You should be back to this postion, however instead of reading the prayer from the beginning, you skip to reciting Surah Al-Fatiha which is the first chapter of the Quran
              </Text>
              <Image source={require('../../pic/prayer3.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer8} />
              <Text style={styles.description}>Say Ameen</Text>
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 2:SKIP</Text>
              <Text style={styles.description}>
            Obligatory prayer skip the passage after the second rakat, that also applies to the fourth rakat.
              </Text>
              <Button title="Play Audio" onPress={prayer2} />  
              <Text style={styles.description}>Go into ruku after Allahu Akbar</Text>   
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 3:Ruku</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, bend down for ruku. Ruku is the position where you keep your head and back aligned and put your hands on your knees. Here recite Tasbeeh three times or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer4.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer4} />  
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 4:back to standing</Text>
              <Text style={styles.description}>
              Next stand up from the bowing position saying,Sami’Allahu liman hamidah,Rabbana lakal hamd, you move while saying it.
              </Text>
              <Image source={require('../../pic/prayer1.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer5} /> 
              <Text style={styles.description}> Then a longer Allahu Akbar while going into sajdah </Text>
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 5: sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer6} /> 
              <Text style={styles.description}>After saying Allahu Akbar, sit up right</Text>
            </View>




            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 6: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.Say Allahu Akbar, and repeat sajdah.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 7: Back to sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer7} /> 
              <Text style={styles.description}>On the third rakat, you stand back up </Text>
            </View>
          </ScrollView>  
            <Button title="Previous" onPress={() => setStep(step - 1)} />
            <Button title="Next" onPress={handleNextStep} />
          </View>
        );

      case 5:
        return (
          <View style={styles.container}>
          <Text style={styles.title}>Step 5: How to Pray/Salah Fourth Rakat</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 1: Continue from last step</Text>
              <Text style={styles.description}>
              Continue from the last step.
              You should be back to this postion, however instead of reading the prayer from the beginning, you skip to reciting Surah Al-Fatiha which is the first chapter of the Quran
              </Text>
              <Image source={require('../../pic/prayer3.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer8} />
              <Text style={styles.description}>Say Ameen</Text>
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 2:SKIP</Text>
              <Text style={styles.description}>
            Obligatory prayer skip the passage after the second rakat, that also applies to the fourth rakat.
              </Text>
              <Button title="Play Audio" onPress={prayer2} />  
              <Text style={styles.description}>Go into ruku after Allahu Akbar</Text>   
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 3:Ruku</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, bend down for ruku. Ruku is the position where you keep your head and back aligned and put your hands on your knees. Here recite Tasbeeh three times or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer4.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer4} />  
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 4:back to standing</Text>
              <Text style={styles.description}>
              Next stand up from the bowing position saying,Sami’Allahu liman hamidah,Rabbana lakal hamd, you move while saying it.
              </Text>
              <Image source={require('../../pic/prayer1.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer5} /> 
              <Text style={styles.description}> Then a longer Allahu Akbar while going into sajdah </Text>
            </View>



            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 5: sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer6} /> 
              <Text style={styles.description}>After saying Allahu Akbar, sit up right</Text>
            </View>




            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 6: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.Say Allahu Akbar, and repeat sajdah.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 7: Back to sajdah</Text>
              <Text style={styles.description}>
              Say Allahu Akbar and go down for sajdah (prostration). There should 5 points of contact with the ground, your forehead, nose, palms of hand, knees, and toes of the feet. Put your head between your palms such that your thumbs are aligned with earlobes. The elbows should be raised away from the ground. In this position recite Tasbeeh three or any odd number of times you like.
              </Text>
              <Image source={require('../../pic/prayer5.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer7} /> 
              <Text style={styles.description}>On the fourth rakat, you stay seated and finish the prayer </Text>
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 8: Sitting up Right</Text>
              <Text style={styles.description}>
              Say Allahu Akbar, sit upright. It is sunnah to keep your right foot up and lay the left foot on the ground. This position is called Jalsah Al-istiraha or the sitting position of the prayer. Rest your hands on the thighs with fingers reaching the knees.You read the rest of the prayer sitting.
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
            </View>


            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 9: Here we recite Tashahhud silently </Text>
              <Text style={styles.description}>
             While sitting you recite the rest of the prayer. 
              </Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image} />
              <Button title="Play Audio" onPress={prayer9} />  
              <Text style={styles.description}> while reciting(testimony of faith – ashhadu alla ilaha illallah wa ashhadu anna muhammadan abduhu wa rasuluhu) ball up your right hand into a fist and raise your index finger.</Text>   
              <Image source={require('../../pic/prayer7.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer10} /> 
              <Text style={styles.description}>read the rest of the prayer</Text>
              <Image source={require('../../pic/prayer6.png')} style={styles.image}/>
              <Button title="Play Audio" onPress={prayer11} /> 
            </View>

            <View style={styles.stepContainer}>
              <Text style={styles.text}>Step 10:Ending the 4 rakats</Text>
              <Text style={styles.description}>
              Turn your face towards looking over your right shoulder and then turn to left. Each time recite the following:Assalamu alaikum wa rahmatullah 
              </Text>
              <Image source={require('../../pic/prayer8.png')} style={styles.image3} />
              <Button title="Play Audio" onPress={prayer12} />  
            </View>
          </ScrollView>  
            <Button title="Previous" onPress={() => setStep(step - 1)} />
            <Button title="Next" onPress={handleNextStep} />
          </View>

        );

        case 6: 
        return (
          <View style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Full 4 Rakat Prayer Example</Text>
              <Text style={styles.description}>
                This is an example of the full 4 rakat prayer. with different quran passages.
              </Text>
              <Button title="Play Audio" onPress={prayer14} />  
            </View>
          </ScrollView>
            <Button title="Previous" onPress={() => setStep(step - 1)} />
          </View>
          
        )


        
        
        
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {renderStep()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stepContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'gray',
    fontSize: 14,
    lineHeight: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  image2: {
    width: 300,
    height: 1000,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
  },
  audio: {
    width: '100%',
    height: 50, 
    marginTop: 10,
    marginBottom: 10,
  },
});


export default AsrScreen;
