# TicTacToe React Native
A simple TicTacToe game using React Native and Google Nearby Connections API
 
---

## Below there are some instructions for all react-native apps and I did put this information here to help me remember some processes in the future. I hope that it helps me and anyone else.

### Installation :arrow_right: Tutorial for all React Native apps
<b>It is better to follow the React Native CLI approach</b>;
- If you don't have React Native installed yet, you must follow this [tutorial](https://facebook.github.io/react-native/docs/getting-started);  
- If you already have the React Native package and all setup ok, to create a new project you have to type:
```bash
react-native init [name-of-the-project]
```
- To run:
```bash
cd [name-of-the-project]
react-native run-android // if you are using Android
react-native run-ios // if you are using IOS
```
:arrow_right: _*Tips*_: if you are running on a real android device (via adb debugger), you can use the cmd commands ```adb shell input text "RR"``` to reload the app and ```adb shell input keyevent 82``` to open the developer menu.

---

### Changing the name of the App (if you change of idea after initializing it)
 - ```git branch rename-app ``` and ``` git checkout rename-app ``` to create a new branch if something goes wrong;
 - Update the <i>name</i> in <b>package.json</b>, and <i>name and displayName</i> in <b>app.json</b> files (New name for your app);
 - Delete <b>android/</b> and <b>ios/</b> folder but before deleting remember you will lose all the changes you made throughout the app in these folders so its better to have back up, for example react navigation configuration mentioned in documentation, linking fonts and icons, app icon etc;
 - Run ``` react-native upgrade --legacy true ``` (this will generate android and ios folder once again with new configuration);
 - Run ``` react-native link ``` (to re-link all the libraries and packages);
 - Go to android folder and run gradlew clean to clean cache.
 ```bash
 cd android 
 gradlew clean 
 ```
Now back to main app <code>cd ../</code>, run
```bash
react-native run-android
```

---
 
 ### Changing the icon for Android app
  - First have at hand the image icon (<b>1024x1024</b>) that you want to set;
  - Go to [ApeTools](https://apetools.webprofusion.com/#/tools/imagegorilla) and upload the icon on <i>Step 1</i>, select the Android bundle, click in <b>Kapow!</b> and then download the zip file generated;
  - Extract the zip file and copy all the folders inside the folder <i>Bundle/android</i>;
  - Navigate to ``` [yourProject]/android/app/src/main/res ```, delete the mipmaps folders and then paste the drawable icons;
  - Now you need to change the path to these icons. Go to ``` yourProjectFolder/android/app/src/main/res ``` and open the <b>AndroidManifest.xml</b> file;
  - Inside the AndroidManifest.xml file, change from ``` android:icon="@mipmap/ic_launcher" ``` to ``` android:icon="@drawable/icon" ```. <b>PS.: if exists android:roundIcon , you must change the "@mipmap/roundIcon" to "@drawable/icon" as well</b>.
  
  ---
  
  ### Changing splash screen
  - Go to ``` yourProjectFolder/android/app/src/main/res/values ``` and create a new file <i>colors.xml</i> and put the following code:
  ```xml
  <?xml version="1.0" enconding="utf-8" ?>
  <resources>
   <color name="primary">#7159C1</color>
  </resources>
  ```
  > The colors.xml file is used to declare what color will be the background of our splash screen. Inside the tag <color></color> you put the code of the color you want.
  - Now go to ``` yourProjectFolder/android/app/src/main/res/drawable ``` and create a new file <i>background_splash.xml</i>, which is where we are going to definitively develop our splash screen, and put the code below:
  ```xml
  <?xml version="1.0" enconding="utf-8" ?>
  <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/primary"  />
    <item 
     android:width="200dp"
     android:height="200dp"
     android:drawable="@drawable/icon"
     android:gravity="center"    
    />   
  </layer-list>  
  ```
  > Explanations about the code above: the first item draws the background of our splash screen using the color tag defined in the colors.xml; in the second item we are defining our icon, which is inside the drawable folder, to have 200dp x 200dp and positioning it in the center of the screen ( using gravity center the icon will be in the center no matter what the size of the screen )
  - Now we need to the Android to see this file as the splash screen. Go to ``` yourProjectFolder/android/app/src/main/res/values ``` and edit the styles.xml to:
  ```xml
  <resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textColor">#000000</item>
        <item name="android:windowBackground">
            @drawable/background_splash
        </item>
        <item name="android:statusBarColor">
            @color/primary
        </item>
    </style>

</resources>
  ```
> The item android:statusBarColor it is used in case if you have defined some <StatusBar barStyle="light-content" backgroundColor="#7159C1"></StatusBar> inside your <b>App.js</b> file. It is necessary because the js file is read <i>after</i> the styles.xml file, so, if you do not set this up here, when the splash screens appear, the status bar will have a different color than the color when the app is already running.

---

### Building the release of the App
- Open CMD as Administrator;
- Generate a release (upload) key:
```
cd C:\Program Files\Java\jdkx.x.x_x\bin   // go to your java folder
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
> When you run the command above, it will request to define somethings like Name, organization, city, state, country and Store and key passwords. 
- The keystore will be saved inside the bin java folder. Copy it and paste inside the ``` [yourProjectFolder]/android/app ``` directory;
- Edit the file ``` ~/.gradle/gradle.properties ``` or ``` android/gradle.properties ```, and add the following (replace ***** with the correct keystore password, alias and key password)
```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```
- Edit ```[yourProjectFolder]/android/app/build.gradle ``` and add the following:
```java
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
      }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...

```
- Now, generate the releasing APK:
```
cd android
./gradlew bundleRelease //to generate .aab   in [yourProjectFolder]/android/app/build/outputs/bundle/release/
./gradlew assembleRelease  //to generate .apk  in [yourProjectFolder]/android/app/build/outputs/apk/release/
```
- To test in your device, run ``` react-native run-android --variant=release ```
