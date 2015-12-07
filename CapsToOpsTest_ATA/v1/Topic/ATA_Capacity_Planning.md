This topic helps you determine how many ATA servers will be needed to support your network.

## ATA Center Sizing
The ATA Center requires a recommended minimum of 30 days of data for user behavioral analytics. The required disk space for the ATA database on a per domain controller basis is defined below. If you have multiple domain controllers, sum up the required disk space per domain controller to calculate the full amount of space required for the ATA database.

|Packets per second&#42; <br /> <br />|CPU (cores&#42;&#42;) <br /> <br />|Memory (GB) <br /> <br />|OS Storage (GB) <br /> <br />|Database storage per day (GB) <br /> <br />|Database storage per month (GB) <br /> <br />|
|---------------------------|-------------------------|---------------|-------------------|---------------------------------|-----------------------------------|
|1,000 <br /> <br />|4 <br /> <br />|48 <br /> <br />|200 <br /> <br />|1.5 <br /> <br />|45 <br /> <br />|
|10,000 <br /> <br />|4 <br /> <br />|48 <br /> <br />|200 <br /> <br />|15 <br /> <br />|450 <br /> <br />|
|40,000 <br /> <br />|8 <br /> <br />|64 <br /> <br />|200 <br /> <br />|60 <br /> <br />|1,800 <br /> <br />|
|100,000 <br /> <br />|12 <br /> <br />|96 <br /> <br />|200 <br /> <br />|150 <br /> <br />|4,500 <br /> <br />|
|200,000 <br /> <br />|16 <br /> <br />|128 <br /> <br />|200 <br /> <br />|300 <br /> <br />|9,000 <br /> <br />|
&#42;Total daily average number of packets-per-second from all domain controllers being monitored by all ATA Gateways.

&#42;&#42;This includes physical cores, not hyper-threaded cores.

> [!NOTE]
> - The ATA Center can handle an aggregated maximum of 200,000 frames per second (FPS) from all the monitored domain controllers.
> - For large deployments (starting at around 100,000 packets per second) we require that the journal of the database will be located on a different disk then the database.
> - The amounts of storage dictated here are net values, you should always account for future growth and to make sure that the disk the database resides on has at least 20% of free space.
> - If your free space reaches a minimum of either 20% or 100 GB, the oldest 24 hours of data will be deleted. This will continue to occur until either only two days of data or either 5% or 50 GB of free space remains at which point data collection will stop working.

## ATA Gateway Sizing
An ATA Gateway can support monitoring multiple domain controllers, depending on the amount of network traffic of  the domain controllers being monitored.

|Packets per second&#42; <br /> <br />|CPU (cores&#42;&#42;) <br /> <br />|Memory (GB) <br /> <br />|OS storage (GB) <br /> <br />|
|---------------------------|-------------------------|---------------|-------------------|
|10,000 <br /> <br />|4 <br /> <br />|12 <br /> <br />|80 <br /> <br />|
|20,000 <br /> <br />|8 <br /> <br />|24 <br /> <br />|100 <br /> <br />|
|40,000 <br /> <br />|16 <br /> <br />|64 <br /> <br />|200 <br /> <br />|
&#42;Total number of packets-per-second from all domain controllers being monitored by the specific ATA Gateway.

&#42;The total amount of domain controller port-mirrored traffic cannot exceed the capacity of the capture NIC on the ATA Gateway.

&#42;&#42;Hyper-threading must be disabled.

## Domain controller traffic estimation
There are various tools that you can use to discover the average packets per second of your domain controllers. If you do not have any tools that track this counter, you can use Performance Monitor to gather the required information.

To determine packets per second, perform the following on each domain controller:

1. Open Performance Monitor.

   ![](../Image/ATA_traffic_estimation_1.png)

2. Expand **Data Collector Sets**.

   ![](../Image/ATA_traffic_estimation_2.png)

3. Right click **User Defined** and select **New** &gt; **Data Collector Set**.

   ![](../Image/ATA_traffic_estimation_3.png)

4. Enter a name for the collector set and select **Create Manually (Advanced)**.

5. Under **What type of data do you want to include?**, select  **Create data logs and Performance counter**.

   ![](../Image/ATA_traffic_estimation_5.png)

6. Under **Which performance counters would you like to log** click **Add**.

7. Expand **Network Adapter** and select **Packets/sec** and select the proper instance. If you are not sure, you can select **&lt;All instances&gt;** and click **Add** and **OK**.

   > [!NOTE]
   > To do this, in a command line, run `ipconfig /all` to see the name of the adapter and configuration.

   ![](../Image/ATA_traffic_estimation_7.png)

8. Change the **Sample interval** to **1 second**.

9. Set the location where you want the data to be saved.

10. Under **Create the data collector set**  select **Start this data collector set now** and click **Finish**.

   You should now see the data collector set you just created with a green triangle indicating that it is working.

11. After 24 hours, stop the data collector set, by right clicking the data collector set and selecting **Stop**

   ![](../Image/ATA_traffic_estimation_12.png)

12. In File Explorer, browse to the folder where the .blg file was saved and double click it to open it in Performance Monitor.

13. Select the Packets/sec counter, and record the average and maximum values.

   ![](../Image/ATA_traffic_estimation_14.png)

## See Also
[ATA Prerequisites](../Topic/ATA_Prerequisites.md)
[ATA Architecture](../Topic/ATA_Architecture.md)
[For support, check out our forum!](https://social.technet.microsoft.com/Forums/security/en-US/home?forum=mata)

