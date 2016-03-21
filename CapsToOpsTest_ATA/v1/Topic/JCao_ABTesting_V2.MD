---
description: na
experimental: true
keywords: na
pagetitle: ATA Architecture
search: na
ms.custom: 
  - ATA
ms.date: na
ms.prod: identity-ata
ms.technology: 
  - security
ms.tgt_pltfrm: na
ms.topic: article
ms.assetid: 892b16d2-58a6-49f9-8693-jcao00000001
ms.author: 5f6e9ed0-302d-496f-873c-7a2b94e50410
---
# This is Johnney's A/B Testing Page A

# ATA Architecture
The Advanced Threat Analytics architecture is detailed in this diagram:

![](../Image/ATA_architecture_topology.jpg)

ATA has two main components - the ATA Gateway and the ATA Center.

These connect to your existing network by mirroring the network traffic to and from your domain controllers, and by looking at Windows events (forwarded directly from the domain controllers or from a SIEM server) and analyzing the data for attacks and threats.

This section describes the flow of network capturing and processing and drills down into the main components of the ATA Gateway and the ATA Center and their functionality.

![](../Image/ATA_traffic_flow.jpg)

## ATA Components
ATA consists of the following:

- One or more ATA Gateways

- One ATA Center
