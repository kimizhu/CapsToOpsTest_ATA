---
description: na
experimental: true
keywords: na
pagetitle: "Error: Unable to Start Debugging on the Web Server"
search: na
ms.date: na
ms.tgt_pltfrm: na
ms.assetid: 206a0a1e-1ea0-4b81-b4a7-8d2bc429973b
ms.ContentId: 206a0a1e-1ea0-4b81-b4a7-8d2bc429973b
---

# Error: Unable to Start Debugging on the Web Server ##

When you try to debug an application running on a Web server, you may sometimes get this error message:

	Unable to start debugging on the Web server

If your message is longer than that, it is covered by a subtopic of this one.

If you encounter this error, there are several things to consider. First go to [Things to Check](#vxtbshttpservererrorsthingstocheck), and then consider the remaining items based on your hardware and software configuration.

- [Things to Check](#vxtbshttpservererrorsthingstocheck)
- [Web Applications on Remote Servers](#vxtbshttpservererrorswebapplicationsonremoteservers)
- [Web Applications Stored in Visual SourceSafe and Using FrontPage Server Extensions](#vxtbshttpservererrorswebapplicationsstoredinvisualsourcesafeandusingfrontpageserverextensions)
- [Manually Attaching](#vxtbshttpservererrorsmanuallyattaching)
- [Debug Request Could Not Be Processed By the Server Due to Invalid Syntax](#vxtbshttpservererrorsmanuallyattaching)

### <a name="vxtbshttpservererrorsthingstocheck"></a>Things to Check ###

Try checking the following things:

- Review the procedures for setting up ASP.NET or ATL Server. For more information see Preparing to Debug ASP.NET.
- Do you have the necessary access privileges for debugging? For more information see the Security Requirements section in ASP.NET Debugging: System Requirements.
- Are you running a version of Windows that allows the Visual Studio debugger to automatically attach to a Web application? If not, you need to launch the application without debugging and manually attach to it. (For more information, see Manually Attaching and ASP.NET Debugging: System Requirements.)
- Does your Web application have a Web.config file?
 - Does the Web.config file enable debug mode by setting the debug attribute to true? For more information, see How to: Enable Debugging for ASP.NET Applications.
 - Does the Web.config file contain any syntax errors? You can check for syntax errors by running the Web application without debugging. (From the Debug menu, choose Start Without Debugging.) If there are syntax errors in Web.config, detailed information will be displayed.
- Did you create the project by specifying a specific IP address (100.20.300.400, for example)? Debugging a Web server requires NTLM authentication. By default, IP addresses are assumed to be part of the Internet, and NTLM authentication is not done over the Internet. To correct this problem:
 - When creating the project, specify the name of the machine on your intranet.
 - -or-
 - Add the IP address (http://100.20.300.400) to the list of trusted sites on your computer. (From the Internet Explorer Tools menu, choose Internet Options, and then select the Security tab).
- Are the necessary extensions registered on the server machine? If not, re-register ASP.NET as described in the procedure below.
- Was IIS installed on the local machine (the machine running Visual Studio) after Visual Studio was installed? IIS should be installed before Visual Studio. If it was installed afterwards, you may need to re-register ASP.NET.

To re-register ASP.NET

 1. From a command prompt window, run the following command: `systemroot\Microsoft.NET\Framework\ versionNumber \aspnet_regiis -i`

  > **Note**   With Windows Server 2003, you can install ASP.NET using the Add or Remove Programs Control Panel.

 2. Insert the Visual Studio disc, run the setup program, and select Repair/Reinstall. This step will create the wwwroot$ share and add the appropriate permissions.

- Is the site name mapped to the local loopback address while Integrated Authentication is turned on? See this Knowledge Base article for a resolution.
- Is the URL for the project start page properly specified? Are the extension and project directory correct?
- Verify the IIS settings for the Web application. For more information see How to: Verify IIS Property Settings.
- If you have two versions of the .NET Framework installed on the Web server, verify the correct version is set in the IIS Settings. For more information see How to: Verify IIS Property Settings. 

### <a name="vxtbshttpservererrorswebapplicationsonremoteservers"></a>Web Applications on Remote Servers ###

If the Web application is on a remote server, first make sure you have gone through the items in Things to Check. Next check the following:

- Does the machine running IIS server have the Visual Studio Remote Components installed? For more information see Preparing to Debug ASP.NET.
- Do you have the necessary access privileges for debugging? For more information see the Security Requirements section in ASP.NET Debugging: System Requirements.
- Are you using Terminal Server to try to debug a Web application on a remote machine? Remote debugging of native Web applications using Terminal Server is supported under Windows XP. It is not supported under Windows 2000 or Windows NT.

### <a name="vxtbshttpservererrorswebapplicationsstoredinvisualsourcesafeandusingfrontpageserverextensions"></a>Web Applications Stored in Visual SourceSafe and Using FrontPage Server Extensions ###

If the Web application is stored in Visual SourceSafe and uses FrontPage Server Extensions as its Web Access mode, check the following:

- Is Visual SourceSafe located on the same machine as the FrontPage Server/Web server? If so, you can debug using Integrated Authentication. To check the Integrated Authentication setting, see the procedure **To check IIS security settings for the web application** located in the following topic: [How to: Verify IIS Property Settings](https://msdnstage.redmond.corp.microsoft.com/en-US/library/ms165023.aspx).

### Debug Request Could Not Be Processed By the Server Due to Invalid Syntax ###

Sometimes, the server cannot process a debug request due to bad syntax. Bad request syntax may be caused by mistakes in the machine.config file. If the machine.config file sets `maxRequestLength` to a ridiculously large value (40,960,000, for example), this error occurs.

### <a name="vxtbshttpservererrorsmanuallyattaching"></a>Manually Attaching ###

If you follow the troubleshooting steps and still get an error message when you start debugging, you may want to try debugging your application by manually attaching.

To manually attach

1. Start the application without debugging. (From the **Debug** menu, choose **Start Without Debugging**.)
2. Determine the name of the appropriate IIS process or worker process. ATL Server applications are named inetinfo.exe by default. To determine the name of the ASP.NET worker process, see [How to: Find the Name of the ASP.NET Process](https://msdnstage.redmond.corp.microsoft.com/en-US/library/ms241730.aspx). 
Use one of the following procedures to determine which process an ASP.NET or ATL Server application runs under.
4. Attach to the process determined by the preceding step. For more information, see [636d0a52-4bfd-48d2-89ad-d7b9ca4dc4f4](https://msdnstage.redmond.corp.microsoft.com/en-US/library//dwesw3ee(VS.140).aspx#NotExistJustToMakeTheAElementVisible).

To check which process an ASP.NET application runs under

1. Use Visual Studio or another text editor to open the `machine.config` file for the application.
2. Inside the `system.web` node, find the `ProcessModel` node, and examine its `enable` attribute:

If `enable` is set to **TRUE**, the application runs under `aspnet_wp.exe` or `w3wp.exe`. (This is also the default setting.)

If `enable` is set to **FALSE**, the application runs under inetinfo.exe. 


To check which process an ATL Server application runs under

1. In Solution Explorer, right-click the project name and choose **Properties** from the shortcut menu.

2. In the <Project> Property Pages dialog box, open the **Web Deployment** folder and choose **General**.

3. Look at the **Application Protection** setting.

   If the setting is **Low (IIS Process)**, the application runs under inetinfo.exe.

   If the setting is **Medium (Pooled)**, the application runs under a dllhost.exe process (in common with other pooled ATL Server applications).

   In the setting is **High (Isolated)**, the application runs under a dllhost.exe process (separate from other ATL Server applications).

4. Click **OK** to close the **<Project> Property Pages** dialog box.

### See Also ###

[Debugging Web Applications: Errors and Troubleshooting](https://msdnstage.redmond.corp.microsoft.com/en-US/library/h35f56yz.aspx)

[Preparing to Debug ASP.NET](https://msdnstage.redmond.corp.microsoft.com/en-US/library/ms165006.aspx)

[Error: The Web Server Could Not Find the Requested Resource](https://msdnstage.redmond.corp.microsoft.com/en-US/library/ms165025.aspx)
