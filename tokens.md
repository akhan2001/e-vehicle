# Gitlab Agent Registration Token

Token: K57AzjqLy5t6m9WMxCEyMxbrK_6GzMqfkg_Bu1sNts55neJfgQ

Docker command:

```
docker run --pull=always --rm \
 registry.gitlab.com/gitlab-org/cluster-integration/gitlab-agent/cli:v14.8.1 generate \
 --agent-token=K57AzjqLy5t6m9WMxCEyMxbrK_6GzMqfkg_Bu1sNts55neJfgQ \
 --kas-address=wss://gitlab.socs.uoguelph.ca/-/kubernetes-agent/ \
 --agent-version v14.8.1 \
 --namespace gitlab-agent | rancher kubectl apply -f -
```

# Gitlab Registry Deploy Token

username: narratiagent
token: sv5xyQsGqJgp7ztBstC7

rancher kubectl create secret docker-registry regcred --namespace=narrati --docker-server=registry.socs.uoguelph.ca --docker-username=narratiagent --docker-password=sv5xyQsGqJgp7ztBstC7 --docker-email=canton@uoguelph.ca
