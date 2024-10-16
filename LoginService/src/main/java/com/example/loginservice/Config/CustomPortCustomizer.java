package com.example.loginservice.Config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.ServerSocket;

@Component
public class CustomPortCustomizer implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

    private static final int DEFAULT_PORT = 8080;
    private static final int MAX_PORT = 8100;

    @Override
    public void customize(TomcatServletWebServerFactory factory) {
        int port = findAvailablePort(DEFAULT_PORT, MAX_PORT);
        factory.setPort(port);
    }

    private int findAvailablePort(int defaultPort, int maxPort) {
        for (int port = defaultPort; port <= maxPort; port++) {
            if (isPortAvailable(port)) {
                return port;
            }
        }
        throw new IllegalStateException("No available port found in the range " + defaultPort + " to " + maxPort);
    }

    private boolean isPortAvailable(int port) {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            return true;
        } catch (IOException ex) {
            return false;
        }
    }
}