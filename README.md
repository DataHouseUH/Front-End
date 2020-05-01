# How to Publish to a folder using Visual Studio
1. First clone or download the Front-End Display Repository.
2. In the root folder of Front-Display, open the Front-End.csproj using Visual Studio.
3. On the navigation panel, click Build -> Publish Front-End. Then publish it as a folder (this might take some time).
4. After publishing, open the folder that you created while doing the publishing step (step 3).
5. Inside the folder there should be a Front-End.exe. Open this file.
6. Now, Front-End should be published.

# How to deploy it to IIS.
1. Go to IIS -> Sites
2. Right Click Sites and create a new website.
3. Put the desire name in the site name: In this case, Front-End.
4. The Physical Path should be the dist folder of the Published solution. Example: C:\Users\livef\Desktop\Portals\FrontEnd\ClientApp\dist
5. Assign a port. In this case we used 81 since 80 was being used for the Server side.
6. Click okay
7. Right click the new site that you created.
8. Click Mange Website -> Browser. Now you should see a website with the solution deployed.