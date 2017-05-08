FROM daocloud.io/nginx
COPY sumred /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]