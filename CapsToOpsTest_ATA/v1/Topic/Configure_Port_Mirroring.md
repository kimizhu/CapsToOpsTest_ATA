The ATA Gateway needs to see all the network traffic to and from each domain controller being monitored. Configure **port mirroring** for each domain controller to be monitored, as the **source** of the network traffic. Typically, you will need to work with the networking or virtualization team to configure port mirroring.

The main data source used by ATA is deep packet inspection of the network traffic to and from your domain controllers. For ATA to see the network traffic, port mirroring needs to be configured. Port mirroring copies the traffic on one port, known as the source port, to another port, known as the destination port.  ATA works with most solutions that can mirror traffic - if the traffic can be port mirrored to ATA, it can be used to analyze threats to your system. To configure port mirroring, refer to your vendor's documentation.

> [!NOTE]
> ATA supports some scenarios using third party Network Visibility Solutions, such as a network TAP.

Your domain controllers and ATA Gateways can be either physical or virtual. The following are common methods for port mirroring and some considerations. Refer to your switch or virtualization server product documentation for additional information. Your switch manufacturer might use different terminology.

**Switched Port Analyzer (SPAN)** – Copies network traffic from one or more switch ports to another switch port on the same switch. Both the ATA Gateway and domain controllers must be connected to the same physical switch.

**Remote Switch Port Analyzer (RSPAN)**  – Allows you to monitor network traffic from source ports distributed over multiple physical switches. RSPAN copies the source traffic into a special RSPAN configured VLAN. This VLAN needs to be trunked to the other switches involved. RSPAN works at Layer 2.

**Encapsulated Remote Switch Port Analyzer (ERSPAN)** – Is a Cisco proprietary technology working at Layer 3. ERSPAN allows you to monitor traffic across switches without the need for VLAN trunks. ERSPAN uses generic routing encapsulation (GRE) to copy monitored network traffic. ATA currently cannot directly receive ERSPAN traffic. For ATA to work with ERSPAN traffic, a switch or router that can decapsulate the traffic needs to be configured as the destination of ERSPAN where the traffic will be decapsulated. The switch or router will then need to be configured to forward it to the ATA Gateway using either SPAN or RSPAN.

> [!NOTE]
> If the domain controller being port mirrored is connected over a WAN link, make sure the WAN link can handle the additional load of the ERSPAN traffic.

## Supported port mirroring options

|ATA Gateway <br /> <br />|Domain Controller <br /> <br />|Considerations <br /> <br />|
|---------------|---------------------|------------------|
|Virtual <br /> <br />|Virtual on same host <br /> <br />|The virtual switch needs to support port mirroring. <br /> <br />Moving one of the virtual machines to another host by itself may break the port mirroring. <br /> <br />|
|Virtual <br /> <br />|Virtual on different hosts <br /> <br />|Make sure your virtual switch supports this scenario. <br /> <br />|
|Virtual <br /> <br />|Physical <br /> <br />|Requires a dedicated network adapter otherwise ATA will see all of the traffic coming in and out of the host, even the traffic it sends to the ATA Center. <br /> <br />|
|Physical <br /> <br />|Virtual <br /> <br />|Make sure your virtual switch supports this scenario - and port mirroring configuration on your physical switches based on the scenario: <br /> <br />If the virtual host is on the same physical switch, you will need to configure a switch level span. <br /> <br />If the virtual host is on a different switch, you will need to configure RSPAN or ERSPAN&#42;. <br /> <br />|
|Physical <br /> <br />|Physical on the same switch <br /> <br />|Physical switch must support SPAN/Port Mirroring. <br /> <br />|
|Physical <br /> <br />|Physical on a different switch <br /> <br />|Requires physical switches to support RSPAN or ERSPAN&#42;. <br /> <br />|
&#42; ERSPAN is only supported when decapsulation is performed before the traffic is analyzed by ATA.

> [!NOTE]
> Make sure that domain controllers and the ATA Gateways to which they connect have time synchronized to within 5 minutes of each other.

**If you are working with virtualization clusters:**

- For each domain controller running on the virtualization cluster in a virtual machine with the ATA Gateway,  configure affinity between the domain controller and the ATA Gateway. This way when the domain controller moves to another host in the cluster the ATA Gateway will follow it. This works well when there are a few domain controllers.

- To make sure the ATA Gateways are properly sized to handle monitoring all of the DCs by themselves, try this option: Install a virtual machine on each virtualization host and install an ATA Gateway on each host. Configure each ATA Gateway to monitor all of the domain controllers  that run on the cluster. This way, any host the domain controllers run on will be monitored.

After configuring port mirroring, validate that port mirroring is working before installing the ATA Gateway.

## See Also
[Validate Port Mirroring](../Topic/Validate_Port_Mirroring.md)
[Install ATA](../Topic/Install_ATA.md)
[For support, check out our forum!](https://social.technet.microsoft.com/Forums/security/en-US/home?forum=mata)

