# C19PathFinder

## About

This project is an earnest attempt by a group of passionate software engineers to leverage technology and throw some light on the recent onset of **Covid-19 (Corono)** virus which has turned out to be a serious pandemic.

To contain this virus outbreak, it is absolutely critical to understand the path of it's transmission so that safety and preventive measures can be taken. The project intends to capture the path of virus through an infected person or potential *vectors (virus carriers)*. At this point the authorities are desperately trying to find, isolate and help the victims plus more importantly find potential *vectors*.

> The sad or scariest thing is that people are <ins>unaware</ins> of their pathway crossings (location co-ordinates) with any victims (making them potential *vectors*) and thus are <ins>unable to prevent</ins> further transmission to others including their near and loved ones.

This critical information that the project intends to unearth would be of grave help to everyone (including Govt. and Health authorities) in terms of forming an understanding on the following:

* Virus *transmission path*
* Potential *vectors*
* Geographically *affected zones*
* Geographically *safe zones*

## Approach

The project leverages the following software components to achieve its core objective:

* Smart Mobile Application

  * The mobile application should be **downloaded** and **installed** by everyone on their smart phone.
  * The mobile application attempts to **continuously** capture the travel path of an individual through the **location services** in his smart phone and scans for potential pathway crossings with a victim or potential *vector* around the same time.
  
* Mobile Backend Service

  * This component would provide the necessary Rest APIs for providing the victim/vector pathway to the connected mobile application for any specific scan iteration.
  * The component would store all the positive scan results (in the form of pathway or location co-ordinates) from individual mobile applications and collate, batch this for subsequent scan iterations.
  * Reporting APIs for individuals and authorities.
  
* Admin Interface (Web/Mobile)

  * This would house the various reports that would be consumed by individuals and authorities.
  * This would also have option to define the scan rules.
 

## Release Notes v1.0

1. Mobile App
  * Android version only
  * Capability to export and import Locations info for the past 14 days (the considered incubation time)
  * You could either export directly from Google Takeout or leverage the web view provided by the app
  * The app would seek appropriate permission and continuously track your location from the time of installation
  * The app would display State-wise India Covid-19 statistics on an intuitive map
  * The app would display a heat-map of the victims along with your location info (indicating your risk vs safety)
  * The app would provide basic awareness info on Covid-19
  
2. Mobile Backend Service
  * APIs for Statistics & Dashboards
  * APIs for Heatmaps
  * CSV Import of Victim Route map
  
## Team Info

The following team members burned their midnight lamps to make this possible (despite their pressing work schedules).

  * Shine Xavier
  * Arun Antony
  * Jacob Nelson
  * Vaisakh Babu
  * Jeswin Thomas Simon
  
They wish to thank their families, supporters, friends and employer who made this fruitful collaboration possible!

There's more to be done and less a time for us humanity against this big fight with Covid-19 (and many such trojans that can question our very own existance). Come join hands for a better tomorrow...



