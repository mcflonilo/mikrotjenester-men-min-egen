package org.cards.gateway;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.factory.rewrite.ModifyRequestBodyGatewayFilterFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Configuration
public class LoggingFilterConfig {

    @Bean
    @Order(-1)
    public GlobalFilter loggingFilter() {
        return (exchange, chain) -> {
            logRequest(exchange);
            return chain.filter(exchange).then(Mono.fromRunnable(() -> logResponse(exchange)));
        };
    }

    private void logRequest(ServerWebExchange exchange) {
        System.out.println("Request: " + exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
    }

    private void logResponse(ServerWebExchange exchange) {
        System.out.println("Response: " + exchange.getResponse().getStatusCode());
    }
}