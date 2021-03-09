/*
 * @Author: hiyan 
 * @Date: 2021-03-04 13:49:11 
 * @Last Modified by: hiyan
 * @Last Modified time: 2021-03-09 13:45:10
 */
function renderInTransMediaByNumChart(containerId) {
    const chart = echarts.init(document.getElementById('inTransMedia'));
    $.ajax({
        url: "http://localhost/ebbs-ck-api/EBTInTransformViaNum",
        data: {},
        type: 'GET',
        success: function (data) {            
            console.log(JSON.stringify(data));
            drawChart(data);  
        }
    });

    let graphChartData = [
        {
            symbol: 'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiA8IS0tIENyZWF0ZWQgd2l0aCBNZXRob2QgRHJhdyAtIGh0dHA6Ly9naXRodWIuY29tL2R1b3BpeGVsL01ldGhvZC1EcmF3LyAtLT4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8ZWxsaXBzZSByeT0iMTA5IiByeD0iMTA5IiBpZD0ic3ZnXzIiIGN5PSIxMTEuNDk5OTkxIiBjeD0iMTA5LjQ5OTk5NCIgZmlsbC1vcGFjaXR5PSJudWxsIiBzdHJva2Utb3BhY2l0eT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiMwZDY2OTUiLz4KICA8aW1hZ2UgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFNZ0FBQURJQ0FZQUFBQ3RXSzZlQUFBVlhrbEVRVlI0bk8yZFBhdjF5blhIejBjNDM4RDZCT1o4Z0JoMkhWS2NNcVdLVks1T3dJM0JCSFVwVWh4STRTN3NGTmRKSU1XQmkrRnlDMGNYWExuYVZVaGhnekF1YmhQWWhPUWEyNFQ4VW1oME5GcnpvbmRwdExWK3NPRjVqa2FhcGRIODUyWE4yOU9Ub2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpS29paUtvaWlLb2lpckF6d0RMOEFyOEFhOG05OFZLSUVQODd1YXZ4Zm1kOW5iZGtWWkZDT0dpOG5nSlhBRDdzeWpOTUo1Qlo3M2ZrZEZHWXdReEJKaUdNSTdrTzM5N29vU3hXVFVvWUs0VXd2SWJrcTllWDRGYmRPclVxRWNFOXFDMDI1U2Z3MzhEdmlOK2NhRnVYN2gwWnJUMUgyS21CaEtrd0FYRTNaeTB3aklUWUtHS0JaOE5XVWlMTk9TK0FEeXZkOWxOdFFsUkNWZTdqWlhEQVBpelQzeEFueXNGZWVXMERvMEdxZEdqbHZEMnIvbTc3bjVYY3d2MjlEZVJoUkxjMnl4bUk4b1M0cGlvN2pmY0lWU2JoSDNIRXlHeXVoNjlFcnpMbXYxM3lycXpQYTY4SHYwTmJHYmxrVFR4SG9EL3NiODdLWjAyV1AvamFNS0JYOVRLOXN3ZnBtNE54THlkT0Y2OWJad1lvUzRML1ErSVdIWVRldlJMUW5xUWlNbXVoc0xpbngxcUQ5OEpWNmlHcHN3QzloeEZUYnMydHlpcmlIbXRNWHZ0RTZOa25hY3FIRndOTDhQMmhMNFp0Sytpc1E1U3lEVW1kN1hsTHFiOTMxWk1BMHZoUHVkMTZYaVdRM3E2bEoraUpLZHZFclVKWS9OcGlVTmRjbjZGc2hBdmd4VlVXZndwdWt4MjVsaDJTTFRZdmEzb2U3ZnlPOTlON2F2MmVkOHdTK1UyMTU1clJlVEtKc20xRUM3U21IVDZ2YVlqTjFYVTBpdjNwb1pTbjZiR3pOTGRtTzM1SDNMNzIyRVVnb2I3cVRtSHZaOGdJcEUyb1hVcGJqTktrMHQybjVGckxhNE1iRXRQc091aks1UVovZkhjRXZ2KzU3Zk95RFd0NzNzNlVEZGliSS9RRVZpMVp4SHdObUN6MzQyYVJBU3hxY29sb3B6cEgwZjR0c3NMWTRrbWpYVWhaUGtSM3NiSmNjOWtoTkhnN0J6a2RLRmNBY1Y2cXAvRjFGWTltWENwbG1sUEc1Sm5acDM4QVg0cmJEeHovYzB5QzVOMG12N1dWQjNLRDl0bmZtc2tGdXo2VmZzS293R3VqWG5iZWF6Y3ZHdVpVcmllSG9LQ3VSLzJLUFFwbTVXMkJTYkd6RUMzTDVJTnZFNW9YN0dOUlZoTk5CdFhoVXpuaU1IZjVPcU9aNmVnaDYxUlFxSHFRYVZsZ0dIbU5JaE1zeG92emwrTjNheUExVjBtNVdUYmNUMUJDWlRFRkFYZkZlUEtQNVovSCs3Y1JMYzJ1T3lXZVF6WUVZekM3ZWpEeHU3TmNjaXhEeEpJSjczVHFZd3dEOG8vZWxSOHdnbjI4b3d1NG14OXdoMU00L0orL09FL1dSRUhIS1FyVW9wbzRRUUFza20zUDhzbnBIRWFEWGhQbURwK2VhMmdOYlBxN2p6ckM0YnhPbGJubHN5Yk5wR0taNDFPTlBncjc2VGNHc09ZY3k3QnU2M3ZWYjNGTjZiY0IvUVc1dXpkV3RISk5xYWcyNnZMTGNpOGRWNnRwMjRseDQ3UHNSemt1dWN4aERwZHBsdy95S2QvQ1VnN2ptTTF1WjArMURWMm9aV1ZtUkxqU2ZJSmJwemtZbFlXWEhaaVJXMEg5Zm5YM0lnY1R3OU9lOWFqTFdmdG8xLzNmUGQ4ZmMxR0dvWDduaFF2cGFoc3JyS1pqeXJxU1d1bmd3ZHdsNUxZRS9tZXpHSjhHdzkzNXNvZFBzVFJjQTI2Zk1mOUNGU0EvOEV4U1lkUDBoOGx4amdCOERQQS9hUDZnUFNiU3F2MDVkaTVzQVRiVTF4cFY4VXpVZHNoREE2ZzRwRXVYdmV3VWtvWEo5L05TWHVGTUF0MEVLVUpMVDR5T1NUbndMLzU4a1RrenlISWkxbXI0RUpSVEtwVFdveStOQ1Zab3RONXNNZEhNeHBwOGQ0Ui81eGZmNU9tQ05CLzhvOG05dWU3MHQ4NGRXM3pCaC84ZVNGeTRLbWYwWlNXUkgwZFl5ZVRZYU05U21hV21LMXZhM3cxQ0tOZlo2dzB1ZGZyR0hUbnRBdTdTMElpNmZZMktZaFMzVmhwcE5FNUlYM0pkOWg4RlFOOHdGaUw5dlVGSnVzRmZIWWZZblliZHRjYm1IZjNoQmVmTFQ2V243YXpSMUNTM1YvRFB6UzgvZXBnNTZUQjRxSFBQeGlXeG00SGhOR1NTMktiRkhEaHRuZUpFd1Z5dlM0RXkrempjM2NGZnliYmF6bHhvL2xGV2VoSFg1bncrZ2FBTGV3WEs0QXBOdkp1VmwvdnhDdXFwT1ozV29TSnlRT1dYc1VHNXVYQkNhTlpKTjRrUmtEOUM4b2E5YXdoNzZSYjZyUG5aSE9CZkdkbDh1WGRLdW5zdWRscTlqTHBnYnVpUEVoN0Y0RGs1RkxPejFtUHUrRitQaFdJNHhzNExNcXp6UEtJZmViWjlqM1grYThtM3l3VDhFK1EzZGZoejRHM1BsR3hkNDI3UTF1VTZRWWVYK2ZLR2JsRmZ4TGJLRjIrR1E5OTVaVytPV1c1VWFNd2lURXYvUVpseUtzdUJ6M3lIaStkOVlUZm9nb0ZtdHlFMS9OK1VIWUdmT3p0UVRpNnlpVndGL1Nsc0JKelBZY0F3ZGMxN0lWSWdNR3Z5M3hQWktoWFplZnJXRGpLK0VOemI4Ri9rNkUvOUs2L3RXU2h0Z2xiVWs3NTk2ZTNidk9DT1ZLc01QTTVDUEJBTGVvSncybEtEWngwQkRlbjdtaG1aWHhUOWJmZnJHMEVhK0lhUitzNlRwYkdSWmNzLzJvTUdCR01HMU5VMjRwaW9BdHpmeStJV3pUNG1FdDE5bkswSjA2cyt6STZvTWdNbHNSQ1pkdFoxVS93TDhQRU1pdnRqS202aXRsVWtRSU8va1ZnbnZBRnBQOFZvQzYvOUh3dDlRMW01MVBOeFZJYVVXYXhvNTJQZUMybmJOSTJHWnFmakRNMGNETXlSb1FicEhkWUxZRytNNlhKNEYvdFA3K3M2Mk1zVDFjaC9CazBlMS9CRmVabVl4a2x6eFhEbFJMU25DbmVWVDA5QnZwZXJQeWpVeWRCZDBhSkxQK2JydXZOK3VEckRjSmJDWG90cTJEN2wzY1piY05qWmNtZWFjRTNhTVhmRVFuSm5Ld0ZnTHVZcm5NdXJhTFFBNVhEWXVQWGdUQ0RKazlBSzBMTVJteE1PN29CWWcwdHhpd0NqTWxpQXc5c0lkQVRNVDJoemhDS1ZQRk1nZnU3TlptM1VyWms5RktkbGpLeXJoMS9hVjVGN3QyRE01ZzNpMVRUWVR1elBPYnVMYWJRQTdWekJJWkpoUFg1SVM5aXU3WVR6T3RvdXJKaUdDdC9XYkJHb2J1d3FjaE83OVVpREVLM0hsbzNxYVcrTGJKenphZ0t3SzU3ZE51QXBITnJHVEhRNGkwVWMxMU9ROHAxdng0WmR6WjhOQWVvVmJRbmtiYkRNSTJtMUJjNko1b08yWXZzSWJlMFd6Y1l3T2MycCt1cS9jSUFyRnIwRUpjMjY4MkZJWWxtNUNlVFBFc3J0a1pjUEFBSXQyRE9mZWdzNjUvaE4zU0VmRWlydHZwbGZTcHdmUzQ3OWxaSU5LNEpHc1JBcXNqY1JjTVZjeGJBMjJ2L2E3NjgvZG9iclExMGVTTkx2Q2M4K0o1RCsrMTFLQXJBR2Y2RUh2M3AraVdSa25PYjZJckVIc2pCOXRiczhxT0pyVE5wb0wyVFBBYjNkTm83K2JmTjBzRVY5b20yU0s3dmdpN1pLMzZZVjJ6K3lCSmZ0TUdJczByYzMxM2djajIvV1Z6STNyQVV5TGliaFpYN0d6bTV1QXVhV2htYkhkbWN1OXRad2pjZmNBeVQ1ajlQWElJOStFdVJrU1FBdUdrTzVyNG9Gc0MzMm5IVS9iTlZEM2dObys5ZmVCVUJDSnJrYzA3N0xSYnl2akdPRG9iVUVoQmsyamZhUXM4MzY0VW1TckpXYzlDeE1Gdm1JUkFqQ0d5dXR0c3RpenUvS21zeHphYjVBYzUxOGFUUG5aYUZudmJKOEYxTWdSRm5JeEFqREdibDh5NFZhMnpTd24rSTRNaFlkZjAxaENlZzVidmJac0UxN2tTYkI2bkpoQ3A3RlUzWkRQeHlRK2JlOEw1bG9tZWVyc2ZDZTRvZTBOb1dzNHU2MmtZdVYxc1VnSXhCc25NV0syVkVYRzlNTjZxRnJlZDdmM3dad2QvVFp1Sk1MYVFOblVCNDg2WEsvdnlWbklDZVhyeUp2U3NUWWc5ejMvR1hZY2NhNGZLYVRGSmRqeFRBTGRHenNSMW1aYWJ1SUdaT0tpYnBFQ2Vub0lpV1dKL0pGK3pxbGVBZERjYTBLWlZBSkVSUTVNWlplRzBxa2c4MzN6d2h0WkpDWVIyYnRLTDlYOUpQdVA1dnEwb1M5cERQNHZRODQwdC96WTBZYytNU2F0ZkFuOFJDU05Gc2txdDdCRUhqUEE4cGlZUVo2bG1RQ1NqRXBQd2VSTHZsamhzNFdTZVp6VFhreHZJVEkyaGFZVTdTWE5Sa1FURU1UYnZKQ1dRU3J4TWJ2NGUyb1E0K3JLMG15ZkllKytZVXNUemJNZHp4b0gzOHRvYWhFTmpRSGk1V09zbTAzK2lIYjZ0UnQrcEM5d1BCdFlpSkNZUTM1a1R1WFg5aXA4cjdTS2pGN29MZ3lTZjdVLzg0c2dEdGgxeUw2K3RZZVRPbWZpUFVKZzE4WlBhbFN2elVWTWcydCs3VjR6c1BOMjlXZmI1dVQ2YmZwSGtUSnNLM2psUGdoSGlNT0ZWSUFPZzJ5UWVQTlVkLzE3T1YwYlVKclMxZy96dXVSWEdONkNaUjU2NXZVQm81ejFWdnNqcEVZa0o4OFl3b2R4TjRtZmkrWlVJMDNtK3gyYTdsTHNzbXlLUEE1SDEzUVB1RFUzcDZYeS9RSnlsNXo2djV4Ti9TK1FEL3ptVTJ3bUUrRkZhY2kxd3IwaE1PSHVSMFg4Q3Y2Zk8vQ1dlSGNLWklBNXozNkUybWRnTHhNRkpFKzZQSFZOd3AxM3cxWHp6S2hBdXVtc003bktGNXI3WFNMaGlRcEwwdnZBejhkTnI3OVNLOXFsM3FFZ3V3Sy9GTTMzaEpvbkQzSHVvcld6MmdvVTJCV1I2VTdwa1lBMlB1OWxHa3ljeUVlNk5wZmMwby8rUXp2dVFTSW1JaFBpeGJsQW5jRzQ5cHhMeDV5UGV4NjVxZFpKaUFMcHQvTmsxTGZIelBPeHZlV1ZrMzVEVy9TOVpaNnlMMXEwYXk3UWxJemROd3krU1dCeVNpaG5pTURZY2NsUG1yUkhwUERxakVWNlgwU3pFS3FqRjhHNytmL0hsSlJPK2IzY1duL2ZNZHY4dlUyUGc3M1RMaU45akJnK0l3eWNTbS84d1lUTGdxMGk0MGVLdzN0Rkd4MElFbmpUS0l1R2NhN1NkNTJwbVhybFllYVh3eE8xcjJYeDI2SEVQZjNMNnNtT01lU0c4YlUzSmdsdHMwaStTdndmK0N2aEQ0UG9rY1ZqeDIzRlBmczZqd29CYWx1NlNoczQ0Qkc0Qis4NjQvb1RQbTFWYVlZSzFCdjNuckdPZW5ZOUpFRnVwZG9SWFZob3JvQmJKbGJxdCt3TlAvUDlyL2Z1L3FNOUVmRGZoaDcrY1ArNnI5ZXgwWm5ZbUF0MytoemQ5Y0dzWmFKczFJVGR2WmI1aFFkMTV0d2VFMzh4MzhSV2NkeE8ydDlZUU5tYjA3MVVXbjdLQ3UzRUI3TEI3T2ZCbmtaZjR5Y0p4MlM0LzdZY0lHTmovd0Y5Q3Y1dHJNVGZ2R0VwTTdZUi84UENkWVE2aXZ2RTJ2eU9DYm1rNmVQcncwaEJlRGhzMmZucGNnOXJZWjRRUkJ3eVo4SEpsbjl3MCtwWHcxS0lRelRpSjNFOVlNc1Y1Y0luWWM1V0JaVlY0R1J2aFV0QXQxZjhJL01uNmY3RkNmSlgxZkYwNFphQm5oMElSMWpmL3FvaUV6K2x1bkZmUmJwVDNRVjBiNUFScUJOd2FhOWI2RS95MXlrMEdhTmgxVEVEYUloSmpjZHZFODdXWjllUjB2S09aM1lSM1p0bHVZT05WeERtckQwbHNQd054SVYvQS9qbUcyaS9lbENSckNrUlcyZm5TY1J3TkJ1eFFhSVdWVGJFdGw5eFdJdTdaL1dYY3JrWTJlekJvU1lSWUMvR3hWdGs0bVFIZW1qTWgwcU8zVU1LdFFWYWQyNFovRDRKRnZwdEhlRzlTSU5rU0VjMHcwRTdzVjBhdVI1Z1lwMTFMN1o0R2U0THJKQmw2RXU0a2tWQjdUNXUreDVCTkYzemlLSWZjT3hSa2x5T2x6Q0hFK3NvR0k5NjRwY1pwNTJZUk9WbXI1NzVKSWhHWnNSZ1FmbFZ4bURqc1Zzc3ROWUU0dHJEQjRpYmNXdVIwaTZodyt4NzV5UHRIaTRTMmhkQzc2bkFMY1poNE1pdU9leklDSWJEK21ZMFdOeUdXYjY0VlQ2clFyVDBtZGJhbmlLUzVyK2Y2SnVJd2NYWHpZVUlDc2R1L2xmVjMrOE90MWdGa3h3MjM5OGJ6N3BjWno1cmNKd2s4YnpOeG1QaVNGWWpkekxsWmY5OXNjWlA0c0VrZk43WWs0cjFuOThHV0VvbEhITGMxeFdIaVRGWWczZ0ZMVmg0c0ZEWkl2MzYrWm53cGdOdi91aXowWEo5SThoSDNieTRPRTIreUFyR0Y4Rzc5ZmRYQlFvOGQ5ampBUTQrdWV6THhvdW5yZWY2ZzlHVGwvWng3NGs1V0lMWVFMdGJmYlZkdnNZRWQwclg4c0c1ZldSaXdndmRPaUtRYWt0SEZOOWhNSENidXFFQ3UxQ1g1WHI5L0JiNncvdjIxK2ZjWHdKZkFUMWVJTS9ja2twd1E1NFE1T3JnemNOL0Y5V2FEanFYUytXdmdIMGFFLzhMY3M4WTNqLzJ1ZHFKSWdaeVYzSk9CWlB2NVljWkdjRmR6T3FVMDNSbTlwMFg2Lzg5SzRjbEVzcW4xRUY0dC9NZlVaWjV3c3ZOK1JtNU5hVkt3YjlQSzkvc1MrSWIxcTlqZ09udmN6dUxoK3lPNDNxSFlhc0czQlBMQlhyK0NCMm8xcklaSnJFRVpLblhvNlhjb3lpVG9qdWJmajFpeU1PRk1QMFVaQk82cHI0Y1NpVWNjbFlwRFdSVGMvc2doUk9JUngvM0l6VVFsWVk0bUVoV0hzZ2wyYytRb0l1a1RoemF4bEVXZ25ZNVJXSDlMV2lRRHhIRTFmei85R254bEJzalZaZDFyVWlTazBIeWhIdUNMTnF2RWRhMUpsR2tRV09Wb1haZlQ0enMxelpiZ1B4L0QyK2NRWWJJZHpGVWVnVDZCbURBK2tkeTJ6SGpHaGc5aHc1M0EyZzRWaUxJSXdQZEVac29ENFh5TGc0TGhGN1pSTnFuQTJ1elpFMTZPcG45L2JSdVZCd2I0bmNoUWwwaFkyY1JaclRiQmYwd3l4b2JRM0xKWElhWnZsN1pMT1JtNCsyYmRZeG5la3dudGpCdThiNFE5bVhtV2pPTk8vSXp3REIxTlYrWmlNbEtCdGZVK2JqK2pkMXNnd3R2cnZ6TmgzVGZ4ZzFTdnNjeU9ld0xzWi8rRXR2K3lpSUNWQnlXUUFlMGp2K1RXT0VQMnJaV244WFpFRmhNTDdURmtCZUZEYU1vaFlzTVZhMjVkSzhVMUZZcFNZMlhDVUFhVXkxQ0RHYTBubmlISEgwTjdUb2F2bHJBcEdUam1Rdi9TV2wrL0NSWTQ1azQ1S0xRbitZYUVjU093a0FxM3hMMk1pSGZLU1VzTmR4UDM0Q09OY2Z0RFplQ2RZa2VUM1ZoNXgzWWxFWWkzNDVzTUZEM0psNUdkOXNoejNxaEw2Vmh0Y1RkaDhxR2lzSjQvdWxOdTRna0pCYlQ1OVhqUTM0ejZMSmxIUEhOMHA3M0h2aDlSNytMeDE5UkhYMzhCL0hEbU0wdnhqcGNSOTErSTEzUWwydnc2TnZUWEZuZG1IQ3JQaEU2N3VQOFp0MmxUZWY2ZlQ3Qk5adTdSenpEUGFUeDZNYlJXT1FvbTA3MFNQM3E0cEtjWk5TSyswUmt4SUF6YnR0THo5MnBvSm1lbGRlZm11YkYwMVU1OXFqQ3N0cml5enM2Qk1rTmZBdUZpd3JnYis1L3huNkxVVU1VeUlRTTc1VFBmdDYvNWhYbVhaS2IvbnhMNlBWRk5CbG1rdHVpeHc4NzBuVTQ3dzRTUmVaNmJSVEppaFJBS080eVVSOTZyUVQxZ1c4T090VVhFSnFmVHprUmhlSjdkS3hSbWRzcm53dkJhSmR2S3B0TkJlSEplUThuS3RVV1BmYkxUL3AzSHhzSEM4RHcvSnBUL0Z2L1BsMy9Ed1hhKzRlOUhOWHhNZVg4bEFPMUNJRitOMFhpaWttanZSakx3WkdGNDRvZ0pCUkxaREk1Mng4NVFUWitFblllR3V0YW9QSWxic21OdEVVUFkrOTFTd3ZERTR4UEtyeE5OazlBQVpGSnIrUThGL29WQU56WnNXMCtCdXNiN0J2aHFyRERNdldQdnlVeUI4UTN3dlRIM2JnM2hPV203citVL0ZCNXgzRk90TVphQzdrNGtENTFoY01kcVNMM2dTd1pjZCtVcE5qdWoyOGt2OXJabmJmQnZuWlR0YlZmeU1HTzI3SkdoSFNBc3o1SlJQQ0k1L1BFU3ErSkpNUFYwUERpNGpvWnNiNXVTQmZkUXlZZnRjeWcxdUR2bjYyNlBJZWg2T1BLOTdWRzJnZTV4Ync5OTlQWmtjS2RyYU8xeEVuRFBnOHoydGlrNTZMcitKaTlBVW82SmFEM29CRWVKRUlpMlEwK0c2S3lyUUNSMGQ5YzRuZmZLTkRNK09KR2IxMFo4LzJKdmU1SkRsQ0JuRk1qYnlkL2ZGb2kySUNSQ0lNWGU5bXlOMVZIZGRDMUhLdEJkKzY0Q2taeGRJQTJjMUh1bkF1bEJCWEp1VkNBOXFFRE9qUXFrQnhYSXVWR0I5S0FDT1RjcWtCNVVJT2RHQmRLREN1Unp1bisrdHgxN29BTHA0ZXdDb2J1aThIUlRMVlFnUGFoQU9vdkZpcjN0MlJvVlNBOW5GOGpUMDJjdDh0Q2JVNFJRZ2ZTZ0FqazNLcEFlVkNEblJnWFNneERJaDJsdTZPODh2eXN0S2hDSlNDRGwzS2hBSklTUEkxYk9SN0YzZmt3TzJvM1Ridm83OWUvS0NiMTRpcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcUlvaXFJb2lxSW9pcElLL3cvYTdpaDJCbG16d0FBQUFBQkpSVTVFcmtKZ2dnPT0iIGlkPSJzdmdfMSIgaGVpZ2h0PSIxNjUuMDAwMDA2IiB3aWR0aD0iMTY2Ljk5OTk4OCIgeT0iMzQiIHg9IjI0LjAwMDAwNSIvPgogPC9nPgo8L3N2Zz4=',
            symbolSize: 69,
            label: {
                show: false
            },
            value: [0, 0],
        }
    ];
    let linesChartData = [];
    function constructOptionData(data) {        
        for (let [index, item] of data.entries()) {
            // 图标
            graphChartData.push({
                name: item.name,
                s: item.value,
                value: [0.58, data.length - index] // 固定图标值
            })
            // 曲线
            linesChartData.push([
                { coord: [0, 1] }, // 起点
                { coord: [0.58, data.length - index + 0.03] } // 线终点
            ])
        }   
        // debugger; 
    }
    
    const option = {        
        backgroundColor:'#0D6695',
        //backgroundColor:'rgba(0, 0, 0, 0)',
        grid: {
            bottom: '0%'
        },
        polar: {},
        radiusAxis: {
            show: false
        },
        angleAxis: {
            type: 'value',
            show: false,
            clockwise: false,
        },
        series: [{            
            type: 'graph',
            hoverAnimation: false,
            coordinateSystem: 'polar',
            label: {
                normal: {                    
                    show: true,
                    position: 'bottom',
                    distance: 20,
                    fontSize: 12,
                    color: '#fff',
                    formatter: function(params) {
                        var num = 4;
                        var s = ''
                        if (params.data.name) {
                            var _length = params.data.name.length;
                            var c = _length / num
                            for (var i = 0; i < c; i++) {
                                var index = i * num;
                                var end = (i + 1) * num;
                                console.log(index + ',' + end + ',' + params.data.name.substring(index, end))
                                if (i !== 0) {
                                    s = s + '\n'
                                }
                                s = s + params.data.name.substring(index, end)

                            }
                        }
                        if (params.data.s) {
                            s = s + '\n' + '(' + params.data.s + ')'
                        }
                        return s
                    }
                }
            },
            //graph下node的itemstyle
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB0klEQVQ4jaWVSU4CURCGv+5GpZEYMXEiMd6BnSdwOIguvY5ewCuoWzfudOcRHDBBozJId4OL95c8O40C/knlNe9V/VUpagiCsxfGIABCIPK+AQY5GRYZlwruQsmcZEFnpPcUSIC+zgTI8g7yxKHuykAFqOqMPd0U6AJtSQfo6X5QRGxRVoAlYEWyDMznAugDr0BL8iYHiZEbcaDvClAD1oENYBU4ABr6DXAP3AAXCqDspaltkRtxJIUlkW4BO8ChnPnYluwBp8C17jNJx4gDLwUrimwHONbbOMTSQVH2gE+lI/MrYFHEa8DRH6SGQLqrsq2KKzTieREvA7uKZlLEwL5sK7jyjPyIYzloTEFqaMg2FldgxBGjCqnPQLypsySuMPxFeRqk+YsQV9CZ93g/A3HTc5ACAyNOcG3axxX/tLiVbTdP3Md1zStwKYVJ0QXOZdvB1fKPiNu4vm/iOqpwHOYwlO6zbD/ENSjpMZG3Fq61rxkVf3kMaQ84ke6DbG0QDa3EMim+MRooV8AdoyFUx+XvAZfTC0X6CDzJtqcMEHgbZNzYrOnex8RjE37mOsP9Ce+K6l+D3shTz3sX16q2moZyml9Ntv++UbTzTCmT8UzL9As7MKaZUfSmUQAAAABJRU5ErkJggg==',
            symbolSize: 1,
            data: graphChartData,
            silent: false,
            zlevel: 2
            },
            {
                type: 'lines',
                coordinateSystem: 'polar',
                lineStyle: {
                    normal: {
                        color: '#ffff00',
                        width: 2,
                        opacity: 0.9,
                        curveness: .3
                    }
                },
                effect: {
                    show: true,
                    symbol: 'arrow',
                    symbolSize: [8, 10],
                    color: '#1890ff',
                    trailLength: .3,
                    label: {
                        show: true
                    },
                },
                data: linesChartData,
                markLine: {
                },
                label: {
                    show: false
                },
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                zlevel: 1
            },
            {
                type: 'effectScatter',
                coordinateSystem: 'polar',
                zlevel: 2,
                rippleEffect: {
                    period: 2,
                    scale: 1.8,
                    brushType: 'stroke'
                },
                symbolSize: '30',
                itemStyle: {
                    normal: {
                        color: '#fff',
                    }
                },
                data: [{
                    value: [0.58, 5],
                    symbol: 'path://M792.868571 734.354286H251.611429c-55.588571 0-99.474286-43.885714-99.474286-99.474286V304.274286C149.211429 248.685714 196.022857 204.8 251.611429 204.8h541.257142c55.588571 0 99.474286 43.885714 99.474286 99.474286v330.605714c0 55.588571-46.811429 99.474286-99.474286 99.474286zM251.611429 251.611429c-29.257143 0-52.662857 23.405714-52.662858 52.662857v330.605714c0 29.257143 23.405714 52.662857 52.662858 52.662857h541.257142c29.257143 0 52.662857-23.405714 52.662858-52.662857V304.274286c0-29.257143-23.405714-52.662857-52.662858-52.662857H251.611429z M520.777143 839.68c-11.702857 0-23.405714-11.702857-23.405714-23.405714v-105.325715c0-11.702857 11.702857-23.405714 23.405714-23.405714s23.405714 11.702857 23.405714 23.405714v105.325715c0 11.702857-8.777143 23.405714-23.405714 23.405714z M661.211429 839.68h-266.24c-11.702857 0-23.405714-11.702857-23.405715-23.405714s11.702857-23.405714 23.405715-23.405715h266.24c11.702857 0 23.405714 11.702857 23.405714 23.405715-2.925714 11.702857-11.702857 23.405714-23.405714 23.405714z M512 421.302857H351.085714c-11.702857 0-23.405714-11.702857-23.405714-23.405714s11.702857-23.405714 23.405714-23.405714h163.84c11.702857 0 23.405714 11.702857 23.405715 23.405714-2.925714 14.628571-14.628571 23.405714-26.331429 23.405714z M424.228571 573.44c-11.702857 0-23.405714-11.702857-23.405714-23.405714v-152.137143c0-11.702857 11.702857-23.405714 23.405714-23.405714s23.405714 11.702857 23.405715 23.405714v152.137143c0 11.702857-11.702857 23.405714-23.405715 23.405714zM593.92 570.514286c-8.777143 0-17.554286-5.851429-20.48-11.702857L500.297143 409.6c-5.851429-11.702857-2.925714-23.405714 11.702857-29.257143 11.702857-5.851429 23.405714-2.925714 29.257143 11.702857l76.068571 149.211429c5.851429 11.702857 2.925714 23.405714-11.702857 29.257143h-11.702857z M596.845714 573.44c-5.851429 0-8.777143-2.925714-11.702857-5.851429-11.702857-8.777143-14.628571-20.48-5.851428-32.182857l96.548571-143.36c8.777143-11.702857 20.48-14.628571 32.182857-5.851428 11.702857 8.777143 14.628571 20.48 5.851429 32.182857l-96.548572 143.36c-5.851429 8.777143-11.702857 11.702857-20.48 11.702857z'
                }, {
                    value: [0.58, 4],
                    symbol: 'path://M1104.639375 934.623599H693.894583V657.72034h85.807294c24.686327 0 44.613844-19.927517 44.613844-44.613844v-173.993992c0-24.686327-19.927517-44.613844-44.613844-44.613844h-85.807294v-110.791046h41.19345v44.613844c0 17.548112 10.261184 33.460383 26.322168 40.747311l199.27517 89.525114c5.7998 2.676831 12.045738 3.866533 18.291676 3.866533 8.47663 0 16.953261-2.379405 24.240189-7.138215 12.789302-8.179205 20.373655-22.306922 20.373655-37.475629V44.726122a44.703072 44.703072 0 0 0-66.920766-38.814044L824.167008 81.904326v-4.163959c0-24.686327-19.927517-44.613844-44.613844-44.613844s-44.613844 19.927517-44.613844 44.613844V194.628638h-41.193449V128.451436c0-24.686327-19.927517-44.613844-44.613845-44.613844h-125.513614c-24.686327 0-44.613844 19.927517-44.613844 44.613844v66.177202h-41.490875V77.740367c0-24.686327-19.927517-44.613844-44.613844-44.613844s-44.613844 19.927517-44.613844 44.613844v4.312671L215.9316 6.060791a44.703072 44.703072 0 0 0-66.920766 38.814044v373.269162c0 15.168707 7.733066 29.296424 20.373656 37.475629 7.286928 4.75881 15.763558 7.138215 24.240188 7.138215 6.245938 0 12.491876-1.338415 18.291676-3.866533l199.275171-89.525114a44.56923 44.56923 0 0 0 26.322168-40.747311v-44.613844h41.490875v650.767273H81.941355c-24.686327 0-44.613844 19.927517-44.613844 44.613844s19.927517 44.613844 44.613844 44.613844h1022.69802c24.686327 0 44.613844-19.927517 44.613844-44.613844s-19.927517-44.762557-44.613844-44.762557zM934.363203 121.75936v227.233179l-110.047482-49.521367V184.813593l110.047482-63.054233z m-585.928486 177.860525l-110.047482 49.521367V121.75936l110.047482 63.202946V299.619885z m386.653316 184.106463v84.617591h-41.19345v-84.617591h41.19345zM568.380969 173.06528h36.285926v21.563358h-36.285926v-21.563358z m0 110.791047h36.285926v650.767272h-36.285926V283.856327z M1066.420182 325.942053c8.625343 8.774056 20.07623 13.086728 31.527116 13.086727s22.901773-4.312672 31.527117-13.086727a146.571349 146.571349 0 0 0 43.275428-104.396395c0-39.408896-15.31742-76.438386-43.275428-104.396396a44.613844 44.613844 0 0 0-63.054233 0 44.613844 44.613844 0 0 0 0 63.054233 58.14671 58.14671 0 0 1 17.101973 41.342163c0 15.614845-6.097225 30.188701-17.101973 41.193449a44.792299 44.792299 0 0 0 0 63.202946zM74.80314 339.02878c11.450887 0 22.901773-4.312672 31.527117-13.086727a44.613844 44.613844 0 0 0 0-63.054233A58.14671 58.14671 0 0 1 89.228283 221.545658c0-15.614845 6.097225-30.188701 17.101974-41.342163a44.613844 44.613844 0 0 0 0-63.054233 44.613844 44.613844 0 0 0-63.054233 0A146.571349 146.571349 0 0 0 0.000595 221.545658c0 39.408896 15.31742 76.438386 43.275429 104.396395 8.625343 8.774056 20.07623 13.086728 31.527116 13.086727z'                      
                }, {
                    value: [0.58,  1],
                    symbol: 'path://M792.868571 734.354286H251.611429c-55.588571 0-99.474286-43.885714-99.474286-99.474286V304.274286C149.211429 248.685714 196.022857 204.8 251.611429 204.8h541.257142c55.588571 0 99.474286 43.885714 99.474286 99.474286v330.605714c0 55.588571-46.811429 99.474286-99.474286 99.474286zM251.611429 251.611429c-29.257143 0-52.662857 23.405714-52.662858 52.662857v330.605714c0 29.257143 23.405714 52.662857 52.662858 52.662857h541.257142c29.257143 0 52.662857-23.405714 52.662858-52.662857V304.274286c0-29.257143-23.405714-52.662857-52.662858-52.662857H251.611429z M520.777143 839.68c-11.702857 0-23.405714-11.702857-23.405714-23.405714v-105.325715c0-11.702857 11.702857-23.405714 23.405714-23.405714s23.405714 11.702857 23.405714 23.405714v105.325715c0 11.702857-8.777143 23.405714-23.405714 23.405714z M661.211429 839.68h-266.24c-11.702857 0-23.405714-11.702857-23.405715-23.405714s11.702857-23.405714 23.405715-23.405715h266.24c11.702857 0 23.405714 11.702857 23.405714 23.405715-2.925714 11.702857-11.702857 23.405714-23.405714 23.405714z M512 421.302857H351.085714c-11.702857 0-23.405714-11.702857-23.405714-23.405714s11.702857-23.405714 23.405714-23.405714h163.84c11.702857 0 23.405714 11.702857 23.405715 23.405714-2.925714 14.628571-14.628571 23.405714-26.331429 23.405714z M424.228571 573.44c-11.702857 0-23.405714-11.702857-23.405714-23.405714v-152.137143c0-11.702857 11.702857-23.405714 23.405714-23.405714s23.405714 11.702857 23.405715 23.405714v152.137143c0 11.702857-11.702857 23.405714-23.405715 23.405714zM593.92 570.514286c-8.777143 0-17.554286-5.851429-20.48-11.702857L500.297143 409.6c-5.851429-11.702857-2.925714-23.405714 11.702857-29.257143 11.702857-5.851429 23.405714-2.925714 29.257143 11.702857l76.068571 149.211429c5.851429 11.702857 2.925714 23.405714-11.702857 29.257143h-11.702857z M596.845714 573.44c-5.851429 0-8.777143-2.925714-11.702857-5.851429-11.702857-8.777143-14.628571-20.48-5.851428-32.182857l96.548571-143.36c8.777143-11.702857 20.48-14.628571 32.182857-5.851428 11.702857 8.777143 14.628571 20.48 5.851429 32.182857l-96.548572 143.36c-5.851429 8.777143-11.702857 11.702857-20.48 11.702857z'      
                }, {
                    value: [0.58,  3],
                    symbol: 'path://M485.6 365.3c-149.8 0-242.3-13.2-282-17.6v409.8c39.7-4.4 132.2-17.6 282-17.6s295.2 13.2 334.9 17.6V347.7c-39.7 4.4-185.1 17.6-334.9 17.6z M881.5 772.5c-0.5 0-1.1 0-1.7-0.1-1.9-0.2-191.6-21-399.5-21-158.3 0-261.9 12.3-317.5 18.9l-18.7 2.2c-4.3 0.4-8.5-0.9-11.7-3.8-3.2-2.8-5-6.9-5-11.2v-491c0-4.3 1.8-8.4 5-11.2 3.2-2.9 7.5-4.2 11.7-3.8l18.7 2.2c55.6 6.6 159.2 18.9 317.5 18.9 207.9 0 397.6-20.8 399.5-21 4.2-0.4 8.5 0.9 11.7 3.8 3.2 2.8 5 6.9 5 11.2v490.9c0 4.3-1.8 8.4-5 11.2-2.7 2.5-6.3 3.8-10 3.8z m-401.2-51.2c173.7 0 335 14.4 386.1 19.5V283.2c-51.1 5.1-212.4 19.5-386.1 19.5-160.1 0-264.8-12.4-321-19.1l-1.7-0.2v457.1l1.7-0.2c56.2-6.6 161-19 321-19z M409.1 634.5c-8.3 0-15.1-6.7-15.1-15v-70.8c0-8.3 6.7-15 15.1-15s15.1 6.7 15.1 15v70.8c-0.1 8.2-6.8 15-15.1 15zM477.7 634.5c-8.3 0-15.1-6.7-15.1-15v-87.3c0-8.3 6.7-15 15.1-15s15.1 6.7 15.1 15v87.3c0 8.2-6.8 15-15.1 15zM546.3 634.5c-8.3 0-15.1-6.7-15.1-15V511.6c0-8.3 6.7-15 15.1-15s15.1 6.7 15.1 15v107.8c0 8.3-6.8 15.1-15.1 15.1zM614.9 634.5c-8.3 0-15.1-6.7-15.1-15v-134c0-8.3 6.7-15 15.1-15s15.1 6.7 15.1 15v134c0 8.2-6.8 15-15.1 15z M385.5 491.8c-6 0-11.6-3.6-14-9.5-3.1-7.7 0.7-16.5 8.4-19.6l88.8-35.6c5-2 10.6-1.2 14.8 2.1l35.4 27.5 84.5-36.7-4.2-2.2c-7.4-3.8-10.3-12.9-6.5-20.3 3.8-7.4 12.9-10.3 20.3-6.5l32.4 16.7c5.2 2.7 8.3 8.1 8.1 13.9-0.2 5.8-3.7 11-9 13.3l-121.8 52.9c-5 2.2-10.9 1.5-15.2-1.9l-35.6-27.7-80.9 32.6c-1.8 0.7-3.7 1-5.5 1z'
    
                }, {
                    value: [0.58,  2],
                    symbol: 'path://M482.1 293.3h60.8V677h-60.8z M512.5 617.1l-30.4-23.8v83.8h60.8v-83.8z M482.1 293.3v110.5c9.8 2 20 3 30.4 3 10.4 0 20.6-1 30.4-3V293.3h-60.8z M421.57 567.208L703.51 788.18l-37.508 47.856-281.94-220.974z M504 631.7l-49.3 38.7L504 709l49.3-38.6z M392.1 604.9l-3.8 13.4 51.7 40.5 17.9-63.2-36.2-28.4z M526.3 649.2L477 687.8l49.3 38.7 49.3-38.7z M603.408 567.172l37.508 47.856L358.976 836l-37.507-47.855z M335.3 805.6l23.8 30.4 39.5-31 28.2-99.4-81.3 63.7zM603.4 567.2l-36.3 28.4 17.9 63.2 51.8-40.5-3.8-13.4zM679.5 769.3l-81.2-63.7 28.1 99.4 39.6 31 23.8-30.4z M687.2 932.3L512.5 315.6 337.9 932.3l-58.5-16.6 203.9-720c3.7-13.1 15.7-22.1 29.3-22.1 13.6 0 25.5 9 29.3 22.1l203.9 720-58.6 16.6z M541.8 195.7c-3.7-13.1-15.7-22.1-29.3-22.1-13.6 0-25.5 9-29.3 22.1l-55.9 197.4c17.2 10.5 36.5 17.9 57.1 21.5l28-99 28 99c20.6-3.6 39.9-11 57.1-21.5l-55.7-197.4z M512.5 253.5m-109.6 0a109.6 109.6 0 1 0 219.2 0 109.6 109.6 0 1 0-219.2 0Z M369 384.1c-4.1 0-8.3-1.8-11.1-5.3-28.6-35.3-44.4-79.8-44.4-125.3s15.8-90 44.4-125.2c5-6.1 13.9-7.1 20.1-2.1 6.1 5 7 13.9 2.1 20-24.5 30.2-38 68.3-38 107.3s13.5 77.1 38 107.3c5 6.1 4 15.1-2.1 20.1-2.6 2.1-5.8 3.2-9 3.2z M299 440.8c-4.1 0-8.3-1.8-11.1-5.3-41.6-51.3-64.5-115.9-64.5-182s22.9-130.7 64.5-182c5-6.1 13.9-7.1 20-2.1s7 13.9 2.1 20c-37.5 46.2-58.1 104.5-58.1 164s20.6 117.8 58.1 164c5 6.1 4 15.1-2.1 20-2.6 2.3-5.7 3.4-8.9 3.4zM656 384.1c-3.2 0-6.3-1-9-3.2-6.1-5-7-13.9-2.1-20.1 24.5-30.2 38-68.3 38-107.3s-13.5-77.1-38-107.3c-5-6.1-4-15.1 2.1-20 6.1-5 15.1-4 20.1 2.1 28.6 35.3 44.4 79.8 44.4 125.2 0 45.5-15.8 90-44.4 125.3-2.8 3.5-6.9 5.3-11.1 5.3z M726.1 440.8c-3.2 0-6.3-1-9-3.2-6.1-5-7-13.9-2.1-20 37.5-46.2 58.1-104.5 58.1-164 0-59.6-20.6-117.8-58.1-164-5-6.1-4-15.1 2.1-20 6.1-5 15.1-4 20 2.1 41.6 51.3 64.5 115.9 64.5 182s-22.9 130.7-64.5 182c-2.8 3.3-6.9 5.1-11 5.1z M388.7 899.6c0-6.1-5-11.1-11.1-11.1h-138c-6.1 0-11.1 5-11.1 11.1v48.9c0 6.1 5 11.1 11.1 11.1h138c6.1 0 11.1-5 11.1-11.1v-48.9zM636.4 899.6c0-6.1 5-11.1 11.1-11.1h138c6.1 0 11.1 5 11.1 11.1v48.9c0 6.1-5 11.1-11.1 11.1h-138c-6.1 0-11.1-5-11.1-11.1v-48.9z'
                }, {
                    name: '应急广播',
                    itemStyle: {
                        normal: {
                            color: '#ffffff',
                            borderColor: '#000'
                        }
                    },
                    symbol: 'path://M42.677,26.583l15.466-0.022l-2.798,4.447l-9.855-0.027 L42.677,26.583L42.677,26.583z M45.562,31.912h9.769c-0.023,2.716,0.075,5.745-3.027,7.152c-1.931,0.875-3.87,0.294-4.639-0.339 C45.447,36.907,45.579,34.432,45.562,31.912L45.562,31.912z M35.709,46.547l0.152,26.248c0,0-0.305,2.039,1.091-0.605l4.001-7.576 c0.297-0.561-0.01-10.404,0.137-9.811c0.229,0.949,0.881,6.957,1.055,6.957l1.744,0.002L57.34,41.876L39.852,41.92 C36.746,41.928,35.543,44.057,35.709,46.547L35.709,46.547z M59.908,41.899c0.068-0.102,5.194-0.532,5.137,3.662 C65.01,48.129,65.29,73.16,65.29,73.16s0.033,0.725-0.579-0.25c-0.61-0.979-4.638-8.297-4.638-8.297l-0.138-9.928 c0,0-0.264,0.959-0.684,3.332c-0.418,2.373-0.688,3.744-0.688,3.744l-12.322-0.014L59.908,41.899L59.908,41.899z M42.545,64.125 h15.896l5.54,9.967l-26.003,0.004c-0.279,0-0.333-0.486,0.008-1.145L42.545,64.125z'
                }]    
            }
        ]
      };

    function drawChart(data) {
        constructOptionData(data);
        chart.setOption(option);
    }
}
