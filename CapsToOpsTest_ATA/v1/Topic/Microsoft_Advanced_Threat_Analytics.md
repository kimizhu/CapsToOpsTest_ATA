Microsoft Advanced Threat Analytics (ATA) is an on-premises product that helps IT security professionals protect their enterprise from advanced targeted attacks by automatically analyzing, learning, and identifying normal and abnormal behavior among entities (users, devices, and resources).  ATA also helps identify known malicious attacks, security issues and risks using world-class, cutting edge research in behavioral analytics to help enterprises identify security breaches before they cause damage.

ATA runs in the background and automatically analyzes, learns, and identifies normal behavior on your network, alerting you to possible security concerns, including:

- **Reconnaissance and Brute Force Suspicious Activities:**

   - Reconnaissance using DNS

      Use of various tools to interact with DNS servers and extract information about your organizations's servers, including IP addresses, server names and functions. This type of attack is usually a preliminary step in which the attackers gain information about your network infrastructure

   - Reconnaissance using Account Enumeration

      Use of tools that use LDAP to scan your Active Directory accounts, extracting a list user names, access rights and often job roles which can provide critical information about what type of access users may have.

   - Brute-force

      Hackers use using brute-force attacks try to access user accounts by trying as may password values as possible (often using complex algorithms to try as many values as a system allows). Kerberos brute-force password-cracking attacks exploit the Kerberos protocol pre-authentication feature by attacking target the encrypted timestamp that's embedded in the Kerberos preauthentication data to derive user passwords.

- **Identity Theft Suspicious Activities**:

   - Pass the ticket

      In pass the ticket attacks, attackers obtain a valid Kerberos ticket from one machine of a recently logged-in user and use it to authenticate to another server.

   - Pass the hash

      In pass the hash attacks, hackers steal the hash of user names and passwords, which are sometimes passed between Windows systems, and use them to authenticate to remote servers or services.

   - Over-Pass-The-Hash

   - Skeleton Key

      A skeleton key attack is malware that is installed on your Active Directory domina and allows the attackers to authenticate as any user while all users continue to have regular access. This is especially hard to detect because the attacker uses multiple accounts to perform various activities that may otherwise look normal.

   - MS14-068 exploit (Forged PAC)

   - Golden Ticket

      In Golden Ticket attacks, hackers use pass the ticket or pass the hash to gain a valid Kerberos Golden Ticket, which is a valid TGT that is encrypted and signed by the Kerberos account for the entire domain.

   - Remote Execution

      An attack by a hacker which runs code remotely on your network.

- **Honey Token account suspicious activities**

- **Abnormal behavior**: ATA uses behavioral analytics and machine learning to uncover questionable activities and abnormal behavior such as anomalous logins, abnormal resource access, abnormal working hours, unknown threats, password sharing and lateral movement.

   - Abnormal Behavior based on Resource access, Source Computers and Work hours (machine learning algorithm)

   - Massive object deletion

- **Security issues and risks**: ATA identifies known security issues, such as broken trust, weak protocols and known protocol vulnerabilities.

   - Sensitive account exposed in plain text authentication

   - Service exposing accounts in plain text authentication

   - Broken Trust

## The following documentation is available to learn more:

- [ATA Release Notes](../Topic/ATA_Release_Notes.md)

- [ATA Architecture](../Topic/ATA_Architecture.md)

- [ATA Deployment Guide](../Topic/ATA_Deployment_Guide.md)

- [ATA Operations Guide](../Topic/ATA_Operations_Guide.md)

- [ATA FAQ](../Topic/ATA_FAQ.md)

## See Also
[For ATA support, check out our forum!](https://social.technet.microsoft.com/Forums/security/en-US/home?forum=mata)

