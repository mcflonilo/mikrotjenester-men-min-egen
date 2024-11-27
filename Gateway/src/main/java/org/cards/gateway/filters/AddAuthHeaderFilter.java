package org.cards.gateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AddAuthHeaderFilter extends AbstractGatewayFilterFactory<AddAuthHeaderFilter.Config> {

    public AddAuthHeaderFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            HttpHeaders headers = exchange.getRequest().getHeaders();
            headers.forEach((key, value) -> System.out.println(key + ": " + value));
            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
            System.out.println("Auth header: " + authHeader);
            if (authHeader != null) {
                exchange = exchange.mutate()
                        .request(r -> r.header(HttpHeaders.AUTHORIZATION, authHeader))
                        .build();
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Put the configuration properties here
    }
}