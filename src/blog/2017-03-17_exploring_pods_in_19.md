---
title: 
date: 2017-03-17
author: Elizabeth K. Joseph and Karl Isenberg, Mesosphere
category: community
description: Elizabeth K. Joseph and Karl Isenberg explore the internals and give an example of pods in DC/OS 1.9
layout: article.jade
collection: posts
lunr: true
---

Pod Internals
=============

To run a pod using Mesos and Marathon, you first have to define it. Pods are configured for Marathon using JSON pod definitions, which look similar to Marathon [application definitions](https://dcos.io/docs/1.9/usage/managing-services/application-basics/), except that they can list multiple containers, referred to as sub-containers, which define the tasks you will want to run together.

To schedule a pod, Marathon converts the pod definition into Mesos task group definitions and accepts offers that have sufficient resources and match the pod constraints. The number of task groups created depends on the number of instances specified in the pod definition, each pod instance gets its own new task group.

Once an offer is accepted, the Mesos master tells the appropriate Mesos agent to launch the task groups assigned to the offer. The Mesos agent, using the [Universal Container Runtime](https://dcos.io/docs/1.9/usage/containerizers/#dc-os-universal-container-runtime), launches a new task group executor for each task group. Like other executors, the task group executor is itself a container. Unlike other executors, the task group executor can manage multiple task as sub-containers that share the executor container’s namespace and resources.

<img src="/assets/images/blog/2017-03-17_pods_diagram.png" alt="Pods diagram" />

To learn more about pods in Marathon, check out the [documentation](http://mesosphere.github.io/marathon/docs/pods.html).

Using Pods in DC/OS 1.9
=======================

In the DC/OS GUI, pods are handled and visually represented as types of [Services](https://dcos.io/docs/1.9/overview/concepts/#dcos-service), along with apps. As such, you can deploy or create a pod by running a new Service in the DC/OS GUI and selecting the Multi-container (Pod).

<img src="/assets/images/blog/2017-03-17_pods_gui_1.jpg" alt="Run a Service screenshot" />

Because pods are configured with JSON pod definitions, you can also use the JSON Configuration option on the Run a Service page to configure a pod, just like you would for an app. The new pods [Quick Start](https://dcos.io/docs/1.9/usage/pods/quickstart/) for DC/OS 1.9 provides a simple example of a pod definition, and you can view more pod definitions in the [Examples](https://dcos.io/docs/1.9/usage/pods/examples/).

Once a pod is up and running, you can view its status in the DC/OS GUI just like any other service. By clicking on your pod in the list of services, you will be taken to the pod detail page where you can view the pod instances and the container within each pod instance, along with their status.

<img src="/assets/images/blog/2017-03-17_pods_gui_1.jpg" alt="Services screenshot" />

Both the DC/OS CLI and REST API also support pods. If you were using the [pod with multiple containers](https://dcos.io/docs/1.9/usage/pods/examples/#a-pod-with-multiple-containers) example, shown in the screenshot above, you would create a pod using the CLI by entering:

\$ dcos marathon pod add a-pod-with-multiple-containers.json

Created deployment 75630ae1-5912-4747-94b9-08f888f01363

To view a list of running and stopped pods, you can use:

\$ dcos marathon pod list

You can also remove, show, and update pods in the CLI by referencing the pod ID:

dcos marathon pod remove \[--force\] &lt;pod-id&gt;

dcos marathon pod show &lt;pod-id&gt;

dcos marathon pod update \[--force\] &lt;pod-id&gt;

See [*Using Pods*](https://dcos.io/docs/1.9/usage/pods/using-pods/) for specific usage of each of these commands.

Conclusion
==========

The pods feature of DC/OS is considered experimental in the 1.9.0 release, and is exclusively supported by the [Universal Container Runtime](https://dcos.io/docs/1.9/usage/containerizers/#dc-os-universal-container-runtime). Pod features currently on the roadmap for future releases include: ordered container start times within a Pod, and Bridge Mode networking support.

To further explore pods in this release you may refer to [the documentation](https://dcos.io/docs/1.9/usage/pods/) which includes a [*Quick Start*](https://dcos.io/docs/1.9/usage/pods/quickstart/), [Technical Overview](https://dcos.io/docs/1.9/usage/pods/technical-overview/), [Using Pods](https://dcos.io/docs/1.9/usage/pods/using-pods/) and [Examples](https://dcos.io/docs/1.9/usage/pods/examples/).
